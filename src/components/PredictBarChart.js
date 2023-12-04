import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const PredictBarChart = ({ lables, graphData }) => {
  return (
    <div>
      <Line
        data={{
          labels: lables,
          datasets: [
            {
              label: "BTC Future Prediction Data with 87% Accuracy",
              data: graphData,
              backgroundColor: "#7660f4",
              borderColor: "#462fc1",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
          ],
        }}
        height={520}
        width={450}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              type: "linear",
              grace: "5%",
              ticks: { color: "rgb(182, 179, 179)" },
              grid: { color: "#2E2E2E" },
            },
            x: {
              ticks: { color: "rgb(182, 179, 179)" },
              // grid: { color: "#2E2E2E" },
            },
          },
        }}
      />
    </div>
  );
};

export default PredictBarChart;
