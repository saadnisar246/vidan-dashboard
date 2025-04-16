// components/HorizontalGraph.tsx
import React from 'react';

export interface TimeSlot {
  start: number; // Represent start time in hours, e.g., 9
  end: number;   // Represent end time in hours, e.g., 11
}

export interface DeskData {
  deskNumber: number;
  workerName: string;
  times: TimeSlot[];
}

interface HorizontalGraphProps {
  data: DeskData[];
  // overall time range for the graph (e.g. from 8 to 18)
  timeRange: { start: number; end: number; }
}

const HorizontalGraph: React.FC<HorizontalGraphProps> = ({ data, timeRange }) => {
  // Total duration of the timeline (in hours)
  const totalHours = timeRange.end - timeRange.start;

  return (
    <div className="p-4 bg-white shadow rounded overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Desk Sitting Time</h2>
      {/* Header row showing time labels */}
      <div className="flex items-center mb-2">
        <div className="w-24"></div>
        <div className="flex flex-grow">
          {Array.from({ length: totalHours + 1 }, (_, idx) => {
            const hour = timeRange.start + idx;
            return (
              <div key={idx} className="flex-1 text-left text-gray-500 text-sm">
                {`${hour}:00`}
              </div>
            );
          })}
        </div>
      </div>
      {/* Render each desk as a row */}
      {data.map((desk) => {
        // Sort timeslots by start time for each desk
        const sortedTimes = [...desk.times].sort((a, b) => a.start - b.start);

        return (
          <div key={desk.deskNumber} className="flex items-center mb-2 border-t border-gray-200 pt-2">
            {/* Desk label */}
            <div className="w-24 font-medium text-gray-700">
              Desk {desk.deskNumber}
            </div>
            {/* Timeline row for the desk */}
            <div className="flex-1 h-8 bg-gray-100 flex items-center">
              {sortedTimes.map((slot, idx) => {
                // Calculate margin-left in percentage for the first slot versus subsequent ones:
                let leftMarginPercent = 0;
                if (idx === 0) {
                  leftMarginPercent = ((slot.start - timeRange.start) / totalHours) * 100;
                } else {
                  const prevSlot = sortedTimes[idx - 1];
                  leftMarginPercent = ((slot.start - prevSlot.end) / totalHours) * 100;
                }
                // Calculate width percentage for this timeslot:
                const widthPercent = ((slot.end - slot.start) / totalHours) * 100;
                return (
                  <div
                    key={idx}
                    className="h-full bg-blue-500 -sm"
                    style={{
                      marginLeft: `${leftMarginPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                    title={`${desk.workerName}: ${slot.start}:00 - ${slot.end}:00`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalGraph;
