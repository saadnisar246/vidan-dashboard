import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

// Sample time-series data
const lineChartData = [
  { time: "2025-04-16T08:00:00", value: 100 },
  { time: "2025-04-16T08:01:00", value: 150 },
  { time: "2025-04-16T08:02:00", value: 120 },
  { time: "2025-04-16T08:03:00", value: 180 },
  { time: "2025-04-16T08:04:00", value: 200 },
];

// 1. Line Graph
export const LineGraph = () => (
  <Card className="p-4 shadow-md">
    <CardContent>
      <h2 className="text-xl font-semibold mb-4">Line Graph (Time Series)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={lineChartData.map(d => ({ ...d, time: new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);