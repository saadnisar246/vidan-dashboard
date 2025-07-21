import { create } from 'zustand';

interface WebSocketState {
  socket: WebSocket | null;
  connect: (onMessage: (event: MessageEvent) => void) => void;
  disconnect: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,

  connect: (onMessage) => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://192.168.0.197:8765`);
    socket.onopen = () => {
      console.log('✅ Global WebSocket connected');
      socket.send('__CONFIG__');
    };
    socket.onmessage = onMessage;
    set({ socket });
  },

  disconnect: () => {
    const current = useWebSocketStore.getState().socket;
    current?.close();
    set({ socket: null });
  },
}));
