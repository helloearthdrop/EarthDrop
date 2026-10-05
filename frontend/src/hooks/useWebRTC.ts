import { useEffect, useRef, useCallback } from 'react';
import { useTransferStore } from '@/store/useTransferStore';

const getWsUrl = () => {
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL;
  }
  if (typeof window !== 'undefined') {
    return `ws://${window.location.hostname}:8000/api/v1/ws`;
  }
  return 'ws://localhost:8000/api/v1/ws';
};

export function useWebRTC() {
  const { roomCode, clientId, status, isSender, setStatus, setPeerId, setSendProgress, setReceiveProgress } = useTransferStore();
  
  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const connect = useCallback((code: string, asSender: boolean) => {
    useTransferStore.getState().setRoomCode(code);
    useTransferStore.getState().setIsSender(asSender);
    useTransferStore.getState().setStatus('connecting');
  }, []);

  useEffect(() => {
    if (!roomCode || status !== 'connecting') return;

    let isActive = true;

    const ws = new WebSocket(`${getWsUrl()}/${roomCode}/${clientId}`);
    wsRef.current = ws;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });
    pcRef.current = pc;

    if (isSender) {
      const dc = pc.createDataChannel('fileTransfer');
      setupDataChannel(dc);
      dataChannelRef.current = dc;
    }

    pc.ondatachannel = (event) => {
      setupDataChannel(event.channel);
      dataChannelRef.current = event.channel;
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'ice-candidate',
          candidate: event.candidate
        }));
      }
    };

    ws.onmessage = async (event) => {
      if (!isActive) return;
      const message = JSON.parse(event.data);
      const target = message.sender;

      switch (message.type) {
        case 'peer-joined':
          console.log('Peer joined:', message.client_id);
          setPeerId(message.client_id);
          if (isSender) {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            ws.send(JSON.stringify({ type: 'offer', offer, target: message.client_id }));
          }
          break;
        case 'offer':
          console.log('Received offer');
          setPeerId(target);
          await pc.setRemoteDescription(new RTCSessionDescription(message.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws.send(JSON.stringify({ type: 'answer', answer, target }));
          break;
        case 'answer':
          console.log('Received answer');
          await pc.setRemoteDescription(new RTCSessionDescription(message.answer));
          break;
        case 'ice-candidate':
          console.log('Received ice candidate');
          if (message.candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
          }
          break;
        case 'peer-left':
          console.log('Peer left');
          setStatus('disconnected');
          setPeerId(null);
          break;
      }
    };

    ws.onerror = () => {
      if (isActive) setStatus('error');
    };
    ws.onclose = (event) => {
       if (!isActive) return;
       if (event.code === 4000) {
         setStatus('idle');
         useTransferStore.getState().setRoomCode(null);
         alert("Cannot join: This room is already full (limited to 2 devices).");
         return;
       }
       const currentStatus = useTransferStore.getState().status;
       if (currentStatus !== 'disconnected' && currentStatus !== 'idle') {
         setStatus('error');
       }
    };

    return () => {
      isActive = false;
      ws.close();
      pc.close();
    };
  }, [roomCode, clientId, isSender, setStatus, setPeerId]);

  const setupDataChannel = (dc: RTCDataChannel) => {
    dc.onopen = () => {
      console.log('Data channel open');
      setStatus('connected');
    };
    dc.onclose = () => {
      console.log('Data channel closed');
      setStatus('disconnected');
    };
    
    const receiveBuffer: Blob[] = [];
    let receivedSize = 0;
    let expectedSize = 0;
    
    dc.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const meta = JSON.parse(event.data);
        if (meta.type === 'file-meta') {
            console.log('Incoming file:', meta.name, meta.size);
            receiveBuffer.length = 0;
            receivedSize = 0;
            expectedSize = meta.size;
            setReceiveProgress(0, meta.name);
        } else if (meta.type === 'file-done') {
            const blob = new Blob(receiveBuffer);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = meta.name;
            a.click();
            URL.revokeObjectURL(url);
            setReceiveProgress(100);
            
            useTransferStore.getState().addHistoryItem({
              name: meta.name,
              size: expectedSize,
              type: 'received'
            });

            setTimeout(() => setReceiveProgress(0, null), 3000); // Clear after 3s
        }
      } else {
        receiveBuffer.push(event.data);
        receivedSize += event.data.byteLength;
        if (expectedSize > 0) {
           setReceiveProgress(Math.min(99, Math.round((receivedSize / expectedSize) * 100)));
        }
      }
    };
  };

  const sendFile = async (file: File) => {
    const dc = dataChannelRef.current;
    if (!dc || dc.readyState !== 'open') return;

    dc.send(JSON.stringify({ type: 'file-meta', name: file.name, size: file.size }));

    const chunkSize = 16384; 
    const arrayBuffer = await file.arrayBuffer();
    
    let offset = 0;
    setSendProgress(0);

    const sendChunk = () => {
      while (offset < arrayBuffer.byteLength) {
        if (dc.bufferedAmount > dc.bufferedAmountLowThreshold) {
          dc.onbufferedamountlow = () => {
            dc.onbufferedamountlow = null;
            sendChunk();
          };
          return;
        }
        const chunk = arrayBuffer.slice(offset, offset + chunkSize);
        dc.send(chunk);
        offset += chunk.byteLength;
        setSendProgress(Math.round((offset / arrayBuffer.byteLength) * 100));
      }
      
      dc.send(JSON.stringify({ type: 'file-done', name: file.name }));
      
      useTransferStore.getState().addHistoryItem({
        name: file.name,
        size: file.size,
        type: 'sent'
      });

      setTimeout(() => setSendProgress(0), 3000); // Clear after 3s
    };
    
    dc.bufferedAmountLowThreshold = 65535;
    sendChunk();
  };
  
  const disconnect = useCallback(() => {
    useTransferStore.getState().reset();
  }, []);

  return { connect, sendFile, disconnect };
}
