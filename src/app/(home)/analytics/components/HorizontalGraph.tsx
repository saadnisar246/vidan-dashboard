// components/HorizontalGraph.tsx
import React from "react";

export interface TimeSlot {
  start: number; // decimal hours
  end: number;   // decimal hours
}

export interface DeskData {
  deskNumber: number;
  workerName: string;
  times: TimeSlot[];
}

interface HorizontalGraphProps {
  data: DeskData[];
  timeRange: { start: number; end: number };
}

// define dimensions in rem units
const LABEL_COL_WIDTH_REM = 5;
const HOUR_CELL_WIDTH_REM = 5;

const LABEL_COL_WIDTH = `${LABEL_COL_WIDTH_REM}rem`;
const HOUR_CELL_WIDTH = `${HOUR_CELL_WIDTH_REM}rem`;
const TICK_HEIGHT_PX = 6;

const HorizontalGraph: React.FC<HorizontalGraphProps> = ({
  data,
  timeRange,
}) => {
  const totalHours = timeRange.end - timeRange.start;
  const hourLabels = Array.from(
    { length: totalHours },
    (_, i) => timeRange.start + i
  );

  const gridCols = `${LABEL_COL_WIDTH} repeat(${totalHours}, ${HOUR_CELL_WIDTH})`;
  const minGridWidth = `${
    LABEL_COL_WIDTH_REM + totalHours * HOUR_CELL_WIDTH_REM
  }rem`;

  const formatTime = (t: number) => {
    const h = Math.floor(t);
    const m = Math.round((t - h) * 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 bg-white shadow rounded overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Desk Sitting Time</h2>

      {/* HEADER */}
      <div
        className="mb-2"
        style={{
          display: "grid",
          gridTemplateRows: "auto auto",
          gridTemplateColumns: gridCols,
          rowGap: "0.25rem",
          alignItems: "center",
          minWidth: minGridWidth,
        }}
      >
        <div />
        {hourLabels.map((h) => (
          <div key={h} className="text-left text-gray-500 text-sm">
            {h}:00
          </div>
        ))}
        <div />
        {hourLabels.map((_, i) => (
          <div key={i} className="flex justify-start">
            <div
              style={{
                width: "2px",
                height: `${TICK_HEIGHT_PX}px`,
                backgroundColor: "#CBD5E0",
              }}
            />
          </div>
        ))}
      </div>

      {/* DESK ROWS */}
      {data.map((desk) => {
        const sorted = [...desk.times].sort((a, b) => a.start - b.start);

        return (
          <div
            key={desk.deskNumber}
            className="mb-2"
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              alignItems: "center",
              minWidth: minGridWidth,
            }}
          >
            <div className="font-medium text-gray-700">
              Desk {desk.deskNumber}
            </div>

            {/* timeline row container */}
            <div className="relative h-8 bg-gray-100" style={{ minWidth: minGridWidth }}>
              {hourLabels.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 border-l border-gray-200"
                  style={{
                    left: `${(i / totalHours) * 100}%`,
                    width: "1px",
                  }}
                />
              ))}

              {sorted.map((slot, idx) => {
                const slotStart = ((slot.start - timeRange.start) / totalHours) * 100;
                const slotEnd = ((slot.end - timeRange.start) / totalHours) * 100;
                const width = slotEnd - slotStart;

                return (
                  <div
                    key={idx}
                    className="absolute top-0 bottom-0 bg-blue-500 group"
                    style={{
                      left: `${slotStart}%`,
                      width: `${width}%`,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {`${desk.workerName}: ${formatTime(slot.start)} – ${formatTime(slot.end)}`}
                    </div>
                  </div>
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
