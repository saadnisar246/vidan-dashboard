"use client";

import React from "react";
import { LineGraph } from "./components/LineGraph";
import { DeskTimeGraph } from "./components/DeskTimegraph";
import { DeskTimePieChart } from "./components/DeskTimePieChart";

import Graph2D from './components/Graph2D';
import HorizontalGraph, { DeskData } from './components/HorizontalGraph';
import PieChartWithTable, { DeskTime } from './components/PieChartWithTable';

export default function Analytics() {
  // Sample data for the Graph2D component
  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const graphData = [12, 19, 3, 5, 2];

  // Sample data for the HorizontalGraph component
  const horizontalData: DeskData[] = [
    { deskNumber: 1, workerName: 'Alice', times: [{ start: 9, end: 11 }, { start: 13, end: 15 }] },
    { deskNumber: 2, workerName: 'Bob', times: [{ start: 10, end: 12 }, { start: 13, end: 16 }, { start: 17, end: 18 }] },
    { deskNumber: 3, workerName: 'John', times: [{ start: 8, end: 12 }, { start: 14, end: 17 }] },
    { deskNumber: 4, workerName: 'Martha', times: [{ start: 11, end: 13 }, { start: 14, end: 17 }] },
    { deskNumber: 5, workerName: 'Dwayne', times: [{ start: 13, end: 15 }, { start: 16, end: 17 }] },
  ];
  const timeRange = { start: 8, end: 18 };

  // Sample data for the PieChartWithTable component
  const deskTimeData: DeskTime[] = [
    { deskNumber: 1, workerName: 'Alice', totalDuration: 4 },
    { deskNumber: 2, workerName: 'Bob', totalDuration: 5 },
    { deskNumber: 3, workerName: 'John', totalDuration: 6 },
    { deskNumber: 4, workerName: 'Martha', totalDuration: 3 },
    { deskNumber: 5, workerName: 'Dwayne', totalDuration: 1 },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* <LineGraph /> */}
      {/* <DeskTimeGraph /> */}
      {/* <DeskTimePieChart /> */}
      {/* <Graph2D labels={graphLabels} data={graphData} /> */}
      <HorizontalGraph data={horizontalData} timeRange={timeRange} />
      <PieChartWithTable data={deskTimeData} />
    </div>
  );
}
