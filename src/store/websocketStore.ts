import { create } from 'zustand';

interface WebSocketState {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,

  connect: () => {
    const socket = new WebSocket('ws://192.168.0.188:8765');
    socket.onopen = () => {
      console.log('✅ Global WebSocket connected');
      socket.send('__CONFIG__');
    };
    set({ socket });
  },

  disconnect: () => {
    const current = useWebSocketStore.getState().socket;
    current?.close();
    set({ socket: null });
  },
}));
