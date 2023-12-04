import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const BitcoinPrediction = () => {
  const [prices, setPrices] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Fetch historical Bitcoin prices
    fetch(
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-07-23&end=2025-12-31"
    )
      .then((response) => response.json())
      .then((data) => {
        const pricesData = Object.entries(data.bpi).map(([date, price]) => ({
          date,
          price,
        }));
        setPrices(pricesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Simple linear regression for demonstration purposes
    if (prices.length > 1) {
      const x = prices.map((_, index) => index);
      const y = prices.map(({ price }) => price);
      const n = prices.length;

      const sumX = x.reduce((acc, val) => acc + val, 0);
      const sumY = y.reduce((acc, val) => acc + val, 0);
      const sumXY = x.reduce((acc, val, index) => acc + val * y[index], 0);
      const sumXSquare = x.reduce((acc, val) => acc + val ** 2, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX ** 2);
      const intercept = (sumY - slope * sumX) / n;

      // Predict future prices
      const futureDates = Array.from({ length: 30 }, (_, index) => index + n);
      const futurePredictions = futureDates.map((date) => ({
        date: date.toString(),
        price: slope * date + intercept,
      }));

      setPredictions(futurePredictions);
    }
  }, [prices]);

  const chartData = {
    labels: [
      ...prices.map(({ date }) => date),
      ...predictions.map(({ date }) => date),
    ],
    datasets: [
      {
        label: "Bitcoin Price",
        data: [
          ...prices.map(({ price }) => price),
          ...predictions.map(({ price }) => price),
        ],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Bitcoin Price Prediction</h1>
      <Line data={chartData} />
    </div>
  );
};

export default BitcoinPrediction;
