"use client";

import React from "react";
import { LineGraph } from "./components/LineGraph";
import { DeskTimeGraph } from "./components/DeskTimegraph";
import { DeskTimePieChart } from "./components/DeskTimePieChart";

import Graph2D from "./components/Graph2D";
import HorizontalGraph, { DeskData } from "./components/HorizontalGraph";
import PieChartWithTable, { DeskTime } from "./components/PieChartWithTable";

export default function Analytics() {
  // Sample data for the Graph2D component
  const graphLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
  const graphData = [12, 19, 3, 5, 2];

  // Sample data for the HorizontalGraph component
  const horizontalData: DeskData[] = [
    {
      deskNumber: 1,
      workerName: "Alice",
      times: [
        { start: 9, end: 11 },
        { start: 13, end: 15 },
      ],
    },
    {
      deskNumber: 2,
      workerName: "Bob",
      times: [
        { start: 10, end: 12 },
        { start: 13, end: 16 },
        { start: 17, end: 18 },
      ],
    },
    {
      deskNumber: 3,
      workerName: "John",
      times: [
        { start: 8, end: 12 },
        { start: 14, end: 17 },
      ],
    },
    {
      deskNumber: 4,
      workerName: "Martha",
      times: [
        { start: 11, end: 13 },
        { start: 14, end: 17 },
      ],
    },
    {
      deskNumber: 5,
      workerName: "Dwayne",
      times: [
        { start: 13, end: 15 },
        { start: 16, end: 17 },
      ],
    },
    {
      deskNumber: 6,
      workerName: "Jacob",
      times: [
        { start: 9, end: 14 },
        { start: 15, end: 20 },
      ],
    },
    {
      deskNumber: 7,
      workerName: "Mary",
      times: [
        { start: 8, end: 9 },
        { start: 10, end: 12 },
        { start: 14, end: 15 },
        { start: 18, end: 23 },
      ],
    },
    {
      deskNumber: 8,
      workerName: "Gretchen",
      times: [{ start: 10, end: 15 }],
    },
    {
      deskNumber: 9,
      workerName: "Allison",
      times: [
        { start: 11, end: 14 },
        { start: 14, end: 17 },
      ],
    },
    {
      deskNumber: 10,
      workerName: "Drake",
      times: [
        { start: 13, end: 16 },
        { start: 18, end: 22 },
      ],
    },
  ];
  const timeRange = { start: 8, end: 23 };

  // Sample data for the PieChartWithTable component
  // Generate deskTimeData from horizontalData
  const deskTimeData: DeskTime[] = horizontalData.map((desk) => {
    const totalDuration = desk.times.reduce(
      (sum, slot) => sum + (slot.end - slot.start),
      0
    );
    return {
      deskNumber: desk.deskNumber,
      workerName: desk.workerName,
      totalDuration,
    };
  });

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
