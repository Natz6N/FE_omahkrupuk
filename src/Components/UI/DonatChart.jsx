import { useEffect, useRef } from "react";
import * as Chart from 'chart.js';
const DoughnutChart = ({ data, height = "h-64" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div className={height}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DoughnutChart;