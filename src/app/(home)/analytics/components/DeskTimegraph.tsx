import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Sample time-series data
const deskTimeData = [
  { desk: "Desk 1", start: "2025-04-16T08:00:00", end: "2025-04-16T10:30:00" },
  { desk: "Desk 2", start: "2025-04-16T09:15:00", end: "2025-04-16T11:00:00" },
  { desk: "Desk 3", start: "2025-04-16T07:45:00", end: "2025-04-16T09:00:00" },
  { desk: "Desk 4", start: "2025-04-16T10:00:00", end: "2025-04-16T12:00:00" },
];

function calculateHours(start: string, end: string): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / 3600000;
}

export const DeskTimeGraph = () => (
  <Card className="p-4 shadow-md">
    <CardContent>
      <h2 className="text-xl font-semibold mb-4">Desk Usage Duration</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={deskTimeData.map((d) => ({
            ...d,
            duration: calculateHours(d.start, d.end),
          }))}
        >
          <XAxis
            type="number"
            label={{
              value: "Time",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis type="category" dataKey="desk" />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} hours`} />
          <Bar dataKey="duration" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
