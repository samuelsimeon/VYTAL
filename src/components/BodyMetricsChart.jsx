// components/BodyMetricsChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BodyMetricsChart = () => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Body Metrics",
        data: [300, 200, 100, 280, 500, 430, 470],
        backgroundColor: "white",
        borderRadius: 8,
        barThickness: 15,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#999", font: { family: "Outfit" } },
      },
      y: {
        beginAtZero: true,
        max: 600,
        ticks: {
          stepSize: 100,
          color: "#999",
          font: { family: "Outfit" },
        },
        grid: { 
            color: "#2a2a3d" ,
            drawOnChartArea: false,

        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="body-metrics-widget">
      {/* Chart */}
      <div className="body-metrics-chart">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Metric Summary */}
      <div className="metrics-summary">
        <h4>Body Metrics</h4>
        <p className="metrics-change">
          <span className="positive">(+23%)</span> than last week
        </p>

        <div className="metrics-row">
          {[
            {
              label: "Weight",
              value: "78",
              icon: "/icons/weight.png",
            },
            {
              label: "Height",
              value: "179",
              icon: "/icons/height.png",
            },
            {
              label: "BMI",
              value: "22.1",
              icon: "/icons/bmi.png",
            },
            {
              label: "Body fat",
              value: "22%",
              icon: "/icons/bodyfat.png",
            },
          ].map((metric, index) => (
            <div className="metric-item" key={index}>
              <div className="metric-icon-label">
                <img src={metric.icon} alt={metric.label} />
                <span>{metric.label}</span>
              </div>
              <p className="metric-value">{metric.value}</p>
              <div className="metric-underline" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyMetricsChart;
