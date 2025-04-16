import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

// Sample time-series data
const lineChartData = [
    { time: "2025-04-16T08:00:00", value: 100 },
    { time: "2025-04-16T09:00:00", value: 200 },
    { time: "2025-04-16T10:00:00", value: 150 },
    { time: "2025-04-16T11:00:00", value: 250 },
  ];
  
  const deskTimeData = [
    { desk: "Desk 1", start: "2025-04-16T08:00:00", end: "2025-04-16T10:30:00" },
    { desk: "Desk 2", start: "2025-04-16T09:15:00", end: "2025-04-16T11:00:00" },
    { desk: "Desk 3", start: "2025-04-16T07:45:00", end: "2025-04-16T09:00:00" },
    { desk: "Desk 4", start: "2025-04-16T10:00:00", end: "2025-04-16T12:00:00" },
  ];
  
  function calculateHours(start: string, end: string): number {
    return (new Date(end).getTime() - new Date(start).getTime()) / 3600000;
  }

export const DeskTimePieChart = () => {
  const pieData = deskTimeData.map(d => ({ ...d, duration: calculateHours(d.start, d.end) }));

  return (
    <Card className="p-4 shadow-md">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Desk Time Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="duration"
                nameKey="desk"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} hours`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2">Desk</th>
                  <th className="px-4 py-2">Start</th>
                  <th className="px-4 py-2">End</th>
                  <th className="px-4 py-2">Duration (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-2">{entry.desk}</td>
                    <td className="px-4 py-2">{new Date(entry.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-2">{new Date(entry.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-2">{calculateHours(entry.start, entry.end).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

  