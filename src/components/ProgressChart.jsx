import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

const ProgressChart = () => {
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Strength",
        data: [0, 40, 25, 65, 85, 55, 90, 40, 50, 110, 70, 150],
        borderColor: "#ff4500",
        backgroundColor: "rgba(255, 69, 0, 0.2)",
        fill: true,
        tension: 0,
        pointRadius: 0
      },
      {
        label: "Endurance",
        data: [90, 70,40, 95, 35, 25, 30, 20, 10, 25, 50, 40],
        borderColor: "#3ddcff",
        backgroundColor: "rgba(61, 220, 255, 0.2)",
        fill: true,
        tension: 0,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          color: "white",
          usePointStyle: true,
          boxWidth: 10,
          font: {
            family: "Outfit",
            size: 13,
            weight: 500
          }
        }
      }
    },
    scales: {
        x: {
          ticks: { color: "white" },
          grid: {
            color: "#2a2a3d", 
            lineWidth: 1,
            borderColor: "#444", 
            drawBorder: true,
            drawOnChartArea: false,
            drawTicks: true
          }
        },
        y: {
          min: 0,
          max: 160,
          stepSize: 20,
          ticks: {
            stepSize: 20,
            color: "white"
          },
          grid: {
            color: "#2a2a3d",           // same as x
            lineWidth: 1,
            borderColor: "#444",        // y-axis edge line
            borderDash: [10, 5],         // dashed grid
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true
          },
          beginAtZero: true
      }
    }
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
