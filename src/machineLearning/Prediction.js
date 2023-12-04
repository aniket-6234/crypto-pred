import React, { useEffect, useState } from "react";
import Loader from "../images/loader.gif";
import PredictBarChart from "../components/PredictBarChart";
import { useGetCryptosQuery } from "../redux/services/cryptoApi";
let prices = 1;
const Prediction = ({ simplified }) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: cryptosList, isFetching } = useGetCryptosQuery(10);
  const [bitcoinValue, setBitcoinValue] = useState(0);
  const [ethereumValue, setEthereumValue] = useState(0);
  const [predictionValue, setPredictionValue] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("Bitcoin");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    nextFiveYears();
  }, []);

  useEffect(() => {
    const coins = cryptosList?.data?.coins;
    const bitcoinValueString = coins?.find((c) => c.name === "Bitcoin")?.price;
    const ethereumValueString = coins?.find(
      (c) => c.name === "Ethereum"
    )?.price;
    const bitcoinValue = parseFloat(bitcoinValueString);
    const ethereumValue = parseFloat(ethereumValueString);
    setBitcoinValue(bitcoinValue);
    setEthereumValue(ethereumValue);
  }, [cryptosList]);

  const generateNextFivePredictions = (currentValue) => {
    const predictions = [];
    if (typeof currentValue === "number") {
      fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-07-23&end=2025-12-31"
      )
        .then((response) => response.json())
        .then((data) => {
          const pricesData = Object.entries(data.bpi).map(([date, price]) => ({
            date,
            price,
          }));
          console.log("pricesData: ", pricesData);
          let newPricesData = JSON.parse(pricesData);
        })
        .catch((error) => console.error("Error fetching data:", error));
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
      }
      predictions.push(parseFloat(currentValue.toFixed(2)));
      for (let i = 1; i <= 4; i++) {
        const randomChange = Math.random() * 0.2 - 0.1;
        const nextValue = parseFloat(
          (predictions[i - 1] * (1 + randomChange)).toFixed(2)
        );
        predictions.push(nextValue);
      }
    }
    return predictions;
  };

  const nextFiveYears = () => {
    const currentYear = new Date().getFullYear();
    const labels = Array.from({ length: 5 }, (_, index) =>
      (currentYear + index).toString()
    );
    setLabels(labels);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCoin(selectedValue);
  };

  const predictFutureCoinPrice = () => {
    setLoading(true);
    let coinPrice = 0;
    if (selectedCoin === "Bitcoin") {
      coinPrice = bitcoinValue;
    } else coinPrice = ethereumValue;
    const predictions = generateNextFivePredictions(coinPrice);
    setPredictionValue(predictions);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    setSelected(true);
  };

  return (
    <div className="px-4 lg:px-24 bg-black overflow-auto">
      <div className="pb-10">
        <h2 className="text-md lg:text-2xl font-md mt-20 lg:mt-24 text-white page-text">
          Crypto Prediction
        </h2>
        <div className="w-full h-[0.5px] mt-2 lg:mt-2 bg-[#313131]"></div>
        <div className="predict-div">
          <div className="pre-option-div">
            <h3>Select Coin:</h3>
            <select
              className="pred-select"
              onChange={handleSelectChange}
              value={selectedCoin}
            >
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
            </select>
          </div>
          <div onClick={predictFutureCoinPrice} className="pred-btn">
            Predict
          </div>
        </div>
        <div className="pred-graph">
          {loading ? (
            <div className="pred-loader">
              {" "}
              <img className="w-[80px]" src={Loader} alt="loader" />
            </div>
          ) : (
            selected && (
              <PredictBarChart lables={labels} graphData={predictionValue} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
