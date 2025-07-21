// // store/streamStore.ts
// import { create } from 'zustand';

// interface StreamConfig {
//   rtsp: string;
//   kpi: string[];
// }

// interface StreamStore {
//   streams: StreamConfig[];
//   setStreams: (streams: StreamConfig[]) => void;
// }

// export const useStreamStore = create<StreamStore>((set) => ({
//   streams: [],
//   setStreams: (streams) => set({ streams }),
// }));
// store/streamStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StreamConfig {
  rtsp: string;
  kpi: string[];
}

interface StreamStore {
  streams: StreamConfig[];
  setStreams: (streams: StreamConfig[]) => void;
}

export const useStreamStore = create<StreamStore>()(
  persist(
    (set) => ({
      streams: [],
      setStreams: (streams) => set({ streams }),
    }),
    {
      name: 'stream-store', // key in localStorage
    }
  )
);
