import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import News from "./components/News";
import Crypto from "./components/Crypto";
import CryptoDetail from "./components/CryptoDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prediction from "./machineLearning/Prediction";
import BitcoinPrediction from "./components/BitcoinPrediction";

function App() {
  return (
    <div style={{ width: "100vw" }} className="bg-[#000]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/news" element={<News />} />
          <Route path="/cryptoDetail/:uuid" element={<CryptoDetail />} />
          <Route path="/crypto-prediction" element={<Prediction />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
