import { create } from "zustand";
import { FramePayload, SSPDPair } from "@/lib/types";

interface SSPDState {
  pairs: SSPDPair[];
  setPairs: (pairs: SSPDPair[]) => void;
  addOrUpdatePair: (pair: Partial<SSPDPair> & { zone_id: string }) => void;
}

export const useSSPDStore = create<SSPDState>((set) => ({
  pairs: [],
  setPairs: (pairs) => set({ pairs }),

  addOrUpdatePair: (newPair) =>
  set((state) => {
    const updated = [...state.pairs];

    if (newPair.login) {
      // Find latest unmatched login for this zone
      const openIndex = [...updated].reverse().findIndex(
        (p) => p.zone_id === newPair.zone_id && p.login && !p.logout
      );
      const actualIndex = openIndex !== -1 ? updated.length - 1 - openIndex : -1;

      if (actualIndex === -1) {
        // ✅ No open login — create new session (add to top)
        updated.unshift({ zone_id: newPair.zone_id, login: newPair.login });
      }
      // Else: already open login exists — ignore new login
    }

    if (newPair.logout) {
      // Match to latest unmatched login
      const openIndex = [...updated].reverse().findIndex(
        (p) => p.zone_id === newPair.zone_id && p.login && !p.logout
      );
      const actualIndex = openIndex !== -1 ? updated.length - 1 - openIndex : -1;

      if (actualIndex !== -1) {
        // ✅ Fill logout in existing session
        updated[actualIndex] = {
          ...updated[actualIndex],
          logout: newPair.logout,
        };
      } else {
        // ❗Orphan logout — add to top as standalone
        updated.unshift({ zone_id: newPair.zone_id, logout: newPair.logout });
      }
    }

    return { pairs: updated };
  }),
}));
