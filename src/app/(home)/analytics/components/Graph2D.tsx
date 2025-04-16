// components/Graph2D.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Graph2DProps {
  // Accept an array of data points, labels, etc.
  labels: string[];
  data: number[];
}

const Graph2D: React.FC<Graph2DProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [{
      label: 'Data Set',
      data,
      fill: false,
      backgroundColor: 'rgba(37, 99, 235, 0.5)', // Tailwind blue-600 with some transparency
      borderColor: 'rgba(37, 99, 235, 1)',
      tension: 0.1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: '2D Line Chart',
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph2D;
