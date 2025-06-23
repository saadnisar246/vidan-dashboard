import { SSPDPair } from "./types"; // Adjust path to where your SSPDPair is defined
import { DeskData, TimeSlot } from "@/app/(home)/analytics/components/HorizontalGraph";

export function transformSSPDToDeskData(sspdPairs: SSPDPair[]): DeskData[] {
  const now = new Date();

  return sspdPairs.map((pair) => {
    const times: TimeSlot[] = [];

    if (pair.login) {
      const loginDate = new Date(pair.login.timestamp);
      const logoutDate = pair.logout ? new Date(pair.logout.timestamp) : now;

      const start =
        loginDate.getHours() + loginDate.getMinutes() / 60 + loginDate.getSeconds() / 3600;
      const end =
        logoutDate.getHours() + logoutDate.getMinutes() / 60 + logoutDate.getSeconds() / 3600;

      if (end >= start) {
        times.push({ start, end });
      }
    }

    return {
      deskNumber: pair.zone_id,
      workerName: `Zone ${pair.zone_id} Person`,
      times,
    };
  });
}
