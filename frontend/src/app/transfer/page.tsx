"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTransferStore } from "@/store/useTransferStore";
import { useWebRTC } from "@/hooks/useWebRTC";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, CheckCircle, ArrowRight, DownloadCloud, Link as LinkIcon, QrCode, Clock } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined') {
    return `http://${window.location.hostname}:8000/api/v1`;
  }
  return 'http://localhost:8000/api/v1';
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function TransferPage() {
  const { roomCode, status, isSender, sendProgress, receiveProgress, currentReceivingFile, addFiles } = useTransferStore();
  const { connect, sendFile, disconnect } = useWebRTC();
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [creationTimeout, setCreationTimeout] = useState(30);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && status === 'idle') {
      const params = new URLSearchParams(window.location.search);
      const room = params.get('room')?.toUpperCase();
      if (room && room.length === 6) {
        setJoinCode(room);
        fetch(`${getApiUrl()}/transfer/rooms/${room}`)
          .then(res => {
            if (res.ok) {
              connect(room, false);
            } else {
              setErrorMsg("The room from the link does not exist.");
              window.history.replaceState(null, '', '/transfer');
            }
          })
          .catch(() => setErrorMsg("Could not connect to server."));
      }
    }
  }, [status, connect]);

  // Automatic 10-minute session countdown timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (status === 'connected') {
      setTimeLeft(600);
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            disconnect();
            alert("Session ended automatically after 10 minutes for security.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, disconnect]);

  // Automatic 30-second expiry if no one joins
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isSender && status === 'connecting') {
      setCreationTimeout(30);
      intervalId = setInterval(() => {
        setCreationTimeout((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            disconnect();
            alert("Room code expired because no one joined in time. Please generate a new code.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSender, status, disconnect]);

  const handleCreateRoom = async () => {
    try {
      const res = await fetch(`${getApiUrl()}/transfer/rooms`, { method: "POST" });
      if (!res.ok) {
        alert(`Server error: Could not create room. Ensure backend is running. (Status ${res.status})`);
        return;
      }
      const data = await res.json();
      connect(data.room_code, true);
    } catch (e) {
      console.error(e);
      alert("Network error: Could not connect to the backend server. Please check your Render URL.");
    }
  };

  const submitJoinRoom = async (code: string) => {
    setErrorMsg("");
    try {
      const res = await fetch(`${getApiUrl()}/transfer/rooms/${code}`);
      if (!res.ok) {
        setErrorMsg("Room not found. Please check the code.");
        return;
      }
      connect(code, false);
    } catch (err) {
      setErrorMsg("Failed to connect to server.");
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim().length === 6) {
      submitJoinRoom(joinCode.trim().toUpperCase());
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/transfer?room=${roomCode}`;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          // Legacy fallback for local network HTTP testing on mobile phones
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed"; // fixed is better to avoid scrolling
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
          } catch (err) {
            console.error("Fallback copy failed", err);
          }
          textArea.remove();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024 * 1024; // 1.5 GB limit to prevent RAM crashes

  const validateAndSendFile = useCallback((files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    
    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert(`The file "${file.name}" is too large!\n\nCurrently, EarthDrop limits transfers to 1.5 GB to prevent your browser from running out of memory and crashing.\n\nUnlimited file streaming is coming in a future update!`);
      return;
    }
    
    addFiles(files);
    sendFile(file);
  }, [addFiles, sendFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (status !== 'connected') return;
    
    validateAndSendFile(Array.from(e.dataTransfer.files));
  }, [status, validateAndSendFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSendFile(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col pt-24 pb-4 px-4 sm:px-6 selection:bg-primary/30">
      
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity shrink-0 -ml-4">
            <Image src="/logo.png" alt="EarthDrop Logo" width={180} height={52} className="object-contain object-left w-[180px]" priority />
          </Link>
          {roomCode && (
            <button 
              onClick={disconnect} 
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-all flex items-center gap-1 sm:gap-2 border border-red-100 dark:border-red-500/20 shadow-sm shrink-0"
            >
              <X className="w-4 h-4 hidden sm:block" /> 
              <span>End Session</span>
            </button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">

        {/* Main Content Area */}
        <div className="flex-1 glass-card rounded-2xl p-4 sm:p-6 mb-6 flex flex-col relative">
          
          <AnimatePresence mode="wait">
            
            {/* STATE: IDLE */}
            {status === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center">Ready to connect?</h2>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
                  Generate a room code or enter an existing one. Once connected, both devices can send and receive files.
                </p>
                
                <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
                  
                  {/* Create Room Side */}
                  <div className="flex flex-col items-center p-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200 dark:border-slate-700 transition-colors hover:border-primary/30">
                    <h3 className="font-semibold text-lg mb-2 text-center">Start a new transfer</h3>
                    <p className="text-slate-500 text-sm text-center mb-6">Generate a secure room code to share.</p>
                    <div className="flex-1 flex items-end w-full">
                      <button 
                        onClick={handleCreateRoom}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl text-base font-medium transition-all shadow-lg shadow-primary/20 flex flex-row items-center justify-center gap-2"
                      >
                        Generate Room Code
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Join Room Side */}
                  <div className="flex flex-col items-center p-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200 dark:border-slate-700 transition-colors hover:border-primary/30">
                    <h3 className="font-semibold text-lg mb-2 text-center">Join a transfer</h3>
                    <p className="text-slate-500 text-sm text-center mb-4">Enter an existing 6-digit code.</p>
                    <form onSubmit={handleJoinRoom} className="w-full flex flex-col gap-3">
                      <input 
                        type="text" 
                        placeholder="ENTER 6 DIGIT CODE" 
                        maxLength={6}
                        value={joinCode}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase();
                          setJoinCode(val);
                          if (val.length === 6) {
                            submitJoinRoom(val);
                          }
                        }}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 font-mono text-center text-xl tracking-[0.2em] focus:ring-2 focus:ring-primary outline-none placeholder:tracking-normal placeholder:text-sm placeholder:text-slate-400 uppercase"
                      />
                      <button 
                        type="submit"
                        disabled={joinCode.length !== 6}
                        className="w-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 py-3.5 rounded-xl text-base font-medium disabled:opacity-50 transition-opacity"
                      >
                        Join Room
                      </button>
                    </form>
                    {errorMsg && (
                      <p className="mt-3 text-sm text-red-500 font-medium text-center">
                        {errorMsg}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE: CONNECTING */}
            {status === 'connecting' && (
              <motion.div 
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full"
              >
                {!isSender ? (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center">
                        <UploadCloud className="w-8 h-8 text-primary" />
                      </div>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                      />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Connecting...</h2>
                    <p className="text-slate-500">Establishing peer-to-peer connection.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full">
                    {showQR ? (
                      <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 w-full max-w-sm relative">
                        <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                        <h3 className="font-semibold text-lg mb-6">Scan to join</h3>
                        <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
                          {typeof window !== 'undefined' && (
                            <QRCodeSVG 
                              value={`${window.location.origin}/transfer?room=${roomCode}`} 
                              size={200}
                              level="H"
                              fgColor="#0f172a"
                              className="w-full h-auto"
                            />
                          )}
                        </div>
                        <p className="text-sm text-slate-500 text-center">Point your phone camera here</p>
                      </div>
                    ) : (
                      <>
                        <div className="relative mb-6 sm:mb-8">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
                            <QrCode className="w-8 h-8 sm:w-12 sm:h-12 text-primary opacity-20" />
                          </div>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                          />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">Room Created</h2>
                        <div className="flex flex-col items-center gap-1 mb-6 sm:mb-8">
                          <p className="text-slate-500 text-sm sm:text-base text-center">Share this code or scan the QR to connect.</p>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-red-500/80 bg-red-500/10 px-2.5 py-1 rounded-full mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            Expires in {creationTimeout}s
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-4">
                          <div className="relative flex items-center w-full">
                            <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl px-4 py-6 font-mono text-3xl sm:text-4xl tracking-[0.3em] text-center font-bold border-2 border-slate-200 dark:border-slate-700 text-primary shadow-inner">
                              {roomCode}
                            </div>
                            <button 
                              onClick={handleCopyLink}
                              className="absolute right-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-3 rounded-xl transition-colors"
                              title="Copy Link"
                            >
                              {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5 text-slate-500" />}
                            </button>
                          </div>
                          
                          <div className="flex w-full mt-2">
                            <button 
                              onClick={() => setShowQR(true)}
                              className="w-full flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 py-3.5 sm:py-4 rounded-xl font-medium transition-colors hover:opacity-90"
                            >
                              <QrCode className="w-5 h-5" />
                              Show QR Code
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STATE: CONNECTED */}
            {status === 'connected' && (
              <motion.div 
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg leading-tight">Securely Connected</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">End-to-end encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto ml-14 sm:ml-0">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-red-500/80 bg-red-500/10 px-2.5 py-1.5 rounded-lg shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(timeLeft)}
                    </div>
                    <div className="font-mono text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg text-slate-500 shrink-0">
                      Room: {roomCode}
                    </div>
                  </div>
                </div>

                {/* Unified Dropzone for BOTH sides */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all relative ${
                    isDragging 
                      ? 'border-primary bg-primary/5 scale-[1.02]' 
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <UploadCloud className={`w-16 h-16 mb-6 transition-colors ${isDragging ? 'text-primary' : 'text-slate-400'}`} />
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">Drag & Drop files to send</h2>
                  <p className="text-sm sm:text-base text-slate-500 mb-6 text-center">Your peer will receive them instantly.</p>
                  <label className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-medium cursor-pointer hover:shadow-md transition-shadow">
                    Browse Files
                    <input type="file" className="hidden" multiple onChange={handleFileInput} />
                  </label>

                  {/* Sending Progress */}
                  {sendProgress > 0 && (
                    <div className="absolute bottom-6 w-3/4 max-w-md bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between text-sm font-medium mb-2 text-primary">
                        <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Sending...</span>
                        <span>{sendProgress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${sendProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Receiving Progress */}
                  {receiveProgress > 0 && (
                    <div className="absolute top-6 w-3/4 max-w-md bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between text-sm font-medium mb-2 text-green-500">
                        <span className="flex items-center gap-2 truncate">
                          <DownloadCloud className="w-4 h-4 flex-shrink-0" /> 
                          Receiving {currentReceivingFile}
                        </span>
                        <span className="flex-shrink-0 ml-4">{receiveProgress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${receiveProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STATE: DISCONNECTED */}
            {status === 'disconnected' && (
              <motion.div 
                key="disconnected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                  <X className="w-10 h-10 text-slate-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Session Ended</h2>
                <p className="text-slate-500 mb-8">The peer has disconnected from the room.</p>
                <button 
                  onClick={disconnect}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Start New Transfer
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
