import React, { useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrasi komponen Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({dataItems = [], }) => {
  const chartRef = useRef(null);

  // Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales ($)",
        data: dataItems,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Return default if chart hasn't rendered yet
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(75,192,192,0.4)');
          gradient.addColorStop(1, 'rgba(75,192,192,0)');
          return gradient;
        },
        borderColor: "#0d6efd", // Bootstrap primary
        tension: 0.3,
      },
    ],
  };

  // Options
  const options = {
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: false,
      },
    },
    scales: {
      x: {
        reverse: true,
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
      },
      y: {
        ticks: {
          stepSize: 1000,
        },
        grid: {
          borderDash: [3, 3],
          color: "rgba(0,0,0,0.0)",
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChart;
