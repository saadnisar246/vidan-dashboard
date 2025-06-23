import { create } from "zustand";
import { FramePayload, SSPDPair } from "@/lib/types"; // adjust this path

interface SSPDState {
  pairs: SSPDPair[];
  setPairs: (pairs: SSPDPair[]) => void;
  addOrUpdatePair: (pair: SSPDPair) => void;
}

export const useSSPDStore = create<SSPDState>((set) => ({
  pairs: [],
  setPairs: (pairs) => set({ pairs }),
  addOrUpdatePair: (newPair) =>
    set((state) => {
      const existingIndex = state.pairs.findIndex((p) => p.zone_id === newPair.zone_id);
      if (existingIndex !== -1) {
        const updated = [...state.pairs];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ...newPair,
        };
        return { pairs: updated };
      }
      return { pairs: [newPair, ...state.pairs] };
    }),
}));
