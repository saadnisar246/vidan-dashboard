// store/streamStore.ts
import { create } from 'zustand';

interface StreamConfig {
  rtsp: string;
  kpi: string[];
}

interface StreamStore {
  streams: StreamConfig[];
  setStreams: (streams: StreamConfig[]) => void;
}

export const useStreamStore = create<StreamStore>((set) => ({
  streams: [],
  setStreams: (streams) => set({ streams }),
}));
