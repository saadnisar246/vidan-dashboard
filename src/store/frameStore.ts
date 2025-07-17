// store/frameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FramePayload } from '@/lib/types';

interface FrameState {
  frames: FramePayload[];
  addFrame: (frame: FramePayload) => void;
  setFrames: (frames: FramePayload[]) => void;
  clearFrames: () => void;
}

export const useFrameStore = create<FrameState>()(
  persist(
    (set) => ({
        frames: [],
        addFrame: (frame) => set((state) => ({ frames: [frame, ...state.frames] })),
        setFrames: (frames) => set({ frames }),
        clearFrames: () => set({ frames: [] }),
    }),
    {
      name: "frames-storage", // Key in localStorage
    }
    )
);
