import { create } from 'zustand';

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
type TransferType = 'sent' | 'received';

export interface TransferHistoryItem {
  id: string;
  name: string;
  size: number;
  type: TransferType;
  timestamp: Date;
}

interface TransferState {
  roomCode: string | null;
  clientId: string;
  status: ConnectionStatus;
  isSender: boolean;
  peerId: string | null;
  files: File[];
  history: TransferHistoryItem[];
  
  sendProgress: number; // 0 to 100
  receiveProgress: number; // 0 to 100
  currentReceivingFile: string | null;
  
  setRoomCode: (code: string | null) => void;
  setStatus: (status: ConnectionStatus) => void;
  setIsSender: (isSender: boolean) => void;
  setPeerId: (id: string | null) => void;
  addFiles: (files: File[]) => void;
  addHistoryItem: (item: Omit<TransferHistoryItem, 'id' | 'timestamp'>) => void;
  setSendProgress: (progress: number) => void;
  setReceiveProgress: (progress: number, fileName?: string | null) => void;
  reset: () => void;
}

const generateClientId = () => Math.random().toString(36).substring(2, 10);

export const useTransferStore = create<TransferState>((set) => ({
  roomCode: null,
  clientId: generateClientId(),
  status: 'idle',
  isSender: false,
  peerId: null,
  files: [],
  history: [],
  sendProgress: 0,
  receiveProgress: 0,
  currentReceivingFile: null,
  
  setRoomCode: (code) => set({ roomCode: code }),
  setStatus: (status) => set({ status }),
  setIsSender: (isSender) => set({ isSender }),
  setPeerId: (id) => set({ peerId: id }),
  addFiles: (newFiles) => set((state) => ({ files: [...state.files, ...newFiles] })),
  addHistoryItem: (item) => set((state) => ({
    history: [{ ...item, id: Math.random().toString(36).substring(2), timestamp: new Date() }, ...state.history]
  })),
  setSendProgress: (progress) => set({ sendProgress: progress }),
  setReceiveProgress: (progress, fileName = undefined) => set((state) => ({ 
    receiveProgress: progress,
    currentReceivingFile: fileName !== undefined ? fileName : state.currentReceivingFile
  })),
  reset: () => set({ 
    roomCode: null, 
    status: 'idle', 
    isSender: false, 
    peerId: null, 
    files: [], 
    history: [],
    sendProgress: 0,
    receiveProgress: 0,
    currentReceivingFile: null,
    clientId: generateClientId() 
  }),
}));
