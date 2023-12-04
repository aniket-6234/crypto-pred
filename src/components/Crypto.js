import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import SearchIcon from "../images/search.svg";
import ArrowIcon from "../images/arrow.svg";
import Loader from "../images/loader.gif";
import MotionArt from "../images/motionArt.png";

import {
  useGetCryptoHistoryQuery,
  useGetCryptosQuery,
} from "../redux/services/cryptoApi";
import CryptoCard from "./CryptoCard";
import { scrollToTopAfterPageRender } from "../utils/scrollToTop";
import axios from "axios";

const Crypto = ({ simplified }) => {
  const count = simplified ? 8 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
    scrollToTopAfterPageRender();
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return (
      <div className="flex bg-black w-screen h-screen justify-center items-center">
        <img className="w-[80px]" src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <div
      style={simplified ? {} : { height: "100vh" }}
      className="px-4 lg:px-24 bg-black overflow-auto"
    >
      {!simplified && (
        <div>
          <h2 className="text-md lg:text-2xl font-md mt-20 lg:mt-24 text-white page-text">
            Crypto's
          </h2>
          <div className="w-full h-[0.5px] mt-2 lg:mt-2 bg-[#313131]"></div>
        </div>
      )}

      {!simplified && (
        <div className="search-bar">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z"
                fill="rgba(67,67,67,1)"
              ></path>
            </svg>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search here..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="get-btn">
            <p>get</p>
            <img src={ArrowIcon} alt="icon" />
          </div>
        </div>
      )}
      <div className="card-container">
        {cryptos?.length === 0 ? (
          <div className="no-data-found">
            <div>
              <img src={MotionArt} alt="" />
            </div>
            <h3 className="no-data-text">No Data Found</h3>
          </div>
        ) : (
          <>
            {cryptos?.map((currency) => (
              <div key={currency.uuid}>
                <Link to={`/cryptoDetail/${currency.uuid}`}>
                  <CryptoCard crypto={currency} />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Crypto;
