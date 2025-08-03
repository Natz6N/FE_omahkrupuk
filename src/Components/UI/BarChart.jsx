import { useEffect, useRef } from "react";
import * as Chart from "chart.js";

// Bar Chart Component
const BarChart = ({ data, height = "h-64", formatValue }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart.Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: data.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback:
                  formatValue ||
                  function (value) {
                    return (value / 1000000).toFixed(0) + "M";
                  },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, formatValue]);

  return (
    <div className={height}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
export default BarChart;
