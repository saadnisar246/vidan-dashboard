// components/HorizontalGraph.tsx
import React from 'react';

export interface TimeSlot {
  start: number;
  end: number;
}

export interface DeskData {
  deskNumber: number;
  workerName: string;
  times: TimeSlot[];
}

interface HorizontalGraphProps {
  data: DeskData[];
  timeRange: { start: number; end: number; };
}

// define dimensions in rem units
const LABEL_COL_WIDTH_REM = 6;
const HOUR_CELL_WIDTH_REM = 6;

const LABEL_COL_WIDTH = `${LABEL_COL_WIDTH_REM}rem`;
const HOUR_CELL_WIDTH = `${HOUR_CELL_WIDTH_REM}rem`;
const TICK_HEIGHT_PX = 6;

const HorizontalGraph: React.FC<HorizontalGraphProps> = ({ data, timeRange }) => {
  const totalHours = timeRange.end - timeRange.start;
  // labels for each hour slot
  const hourLabels = Array.from({ length: totalHours }, (_, i) => timeRange.start + i);

  // grid-template columns: first label column then one per hour
  const gridCols = `${LABEL_COL_WIDTH} repeat(${totalHours}, ${HOUR_CELL_WIDTH})`;

  // compute exact minimum width for scroll container
  const minGridWidth = `${LABEL_COL_WIDTH_REM + totalHours * HOUR_CELL_WIDTH_REM}rem`;

  return (
    // allow horizontal scrolling when content exceeds container width
    <div className="p-4 bg-white shadow rounded overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Desk Sitting Time</h2>

      {/* HEADER */}
      <div
        className="mb-2"
        style={{
          display: 'grid',
          gridTemplateRows: 'auto auto',
          gridTemplateColumns: gridCols,
          rowGap: '0.25rem',
          alignItems: 'center',
          minWidth: minGridWidth,
        }}
      >
        {/* empty corner */}
        <div />
        {/* hour labels */}
        {hourLabels.map((h) => (
          <div key={h} className="text-left text-gray-500 text-sm">
            {h}:00
          </div>
        ))}

        {/* spacer */}
        <div />
        {/* ticks */}
        {hourLabels.map((_, i) => (
          <div key={i} className="flex justify-start">
            <div
              style={{
                width: '2px',
                height: `${TICK_HEIGHT_PX}px`,
                backgroundColor: '#CBD5E0',
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
              display: 'grid',
              gridTemplateColumns: gridCols,
              alignItems: 'center',
              minWidth: minGridWidth,
            }}
          >
            {/* label */}
            <div className="font-medium text-gray-700">Desk {desk.deskNumber}</div>

            {/* timeline grid container */}
            <div
              className="h-8 bg-gray-100 relative"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${totalHours}, ${HOUR_CELL_WIDTH})`,
              }}
            >
              {/* background grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${totalHours}, ${HOUR_CELL_WIDTH})`,
                }}
              >
                {Array.from({ length: totalHours }).map((_, i) => (
                  <div key={i} className="border-l border-gray-200 h-full" />
                ))}
              </div>

              {/* occupied slots */}
              {sorted.map((slot, idx) => (
                <div
                  key={idx}
                  title={`${desk.workerName}: ${slot.start}:00 – ${slot.end}:00`}
                  className="h-full bg-blue-500"
                  style={{
                    gridColumnStart: slot.start - timeRange.start + 1,
                    gridColumnEnd:   slot.end   - timeRange.start + 1,
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalGraph;
