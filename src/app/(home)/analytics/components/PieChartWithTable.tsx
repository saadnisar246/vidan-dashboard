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

const PieChartWithTable: React.FC<PieChartWithTableProps> = ({ data }) => {
  // Prepare the pie chart data
  const pieData = {
    labels: data.map((item) => `Desk ${item.deskNumber} ${item.workerName}`),
    datasets: [
      {
        label: "Sitting Time",
        data: data.map((item) => item.totalDuration),
        backgroundColor: data.map((_, idx) => {
          const colors = [
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
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
              {data.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>Desk {item.deskNumber}</TableCell>
                  <TableCell>{item.workerName}</TableCell>
                  <TableCell>{item.totalDuration} hrs</TableCell>
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
