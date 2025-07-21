// components/PieChartWithTable.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { ColumnDef } from '@tanstack/react-table'; // For type definitions if using a table library (optional)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming shadcn/ui table components are available

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DeskTime {
  deskNumber: number;
  workerName: string;
  totalDuration: number; // in hours or minutes as preferred
}

interface PieChartWithTableProps {
  data: DeskTime[];
}

function mergeDeskTimes(data: DeskTime[]): DeskTime[] {
  const mergedMap = new Map<string, DeskTime>();

  data.forEach((item) => {
    const key = `${item.deskNumber}-${item.workerName}`;
    const existing = mergedMap.get(key);

    if (existing) {
      existing.totalDuration += item.totalDuration;
    } else {
      mergedMap.set(key, { ...item }); // clone to avoid mutating original
    }
  });

  return Array.from(mergedMap.values());
}

const PieChartWithTable: React.FC<PieChartWithTableProps> = ({ data }) => {
  const mergedData = mergeDeskTimes(data);
  // Prepare the pie chart data
  const pieData = {
    labels: mergedData.map((item) => `Desk ${item.deskNumber} ${item.workerName}`),
    datasets: [
      {
        label: "Sitting Time",
        data: mergedData.map((item) => item.totalDuration),
        backgroundColor: mergedData.map((_, idx) => {
          const colors = [
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#8E3C86",
            "#F2E444",
            "#7B32FA",
            "#1AB817",
            "#A5EE3C",
          ];
          return colors[idx % colors.length];
        }),
        hoverOffset: 4,
      },
    ],
  };


  return (
    <div className="p-4 bg-white shadow rounded space-y-6">
      <h2 className="text-lg font-semibold">Desk Sitting Time Breakdown</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1 max-w-xs mx-auto">
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            height={200}
          />
        </div>

        {/* Table */}
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Desk Number</TableHead>
                <TableHead className="w-1/3">Worker Name</TableHead>
                <TableHead className="w-1/3">Total Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mergedData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>Desk {item.deskNumber}</TableCell>
                  <TableCell>{item.workerName.charAt(0).toUpperCase() + item.workerName.slice(1)}</TableCell>
                  <TableCell>{(item.totalDuration).toFixed(2)} min</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PieChartWithTable;
