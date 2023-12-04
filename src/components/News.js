import React, { useEffect } from "react";
import { useGetCryptoNewsQuery } from "../redux/services/cryptoNewsApi";
import moment from "moment";
import Loader from "../images/loader.gif";
import DemoNewsImage from "../images/total-crypto.png";
import { scrollToTopAfterPageRender } from "../utils/scrollToTop";
import axios from "axios";

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "science_and_technology",
    count: simplified ? 6 : 35,
  });

  useEffect(() => {
    scrollToTopAfterPageRender();
  }, []);

  if (!cryptoNews?.length > 0) {
    return (
      <div className="flex bg-black w-screen h-screen justify-center items-center">
        <img className="w-[80px]" src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-24 bg-black overflow-auto">
      {!simplified && (
        <div className="pb-10">
          <h2 className="text-md lg:text-2xl font-md mt-20 lg:mt-24 text-white page-text">
            News
          </h2>
          <div className="w-full h-[0.5px] mt-2 lg:mt-2 bg-[#313131]"></div>
        </div>
      )}
      <div className="news-container">
        {cryptoNews?.map((news, i) => (
          <div key={i} className="news-card">
            <a
              href={news.link}
              target="_blank"
              rel="norefferer"
              className="news-box"
            >
              <div className="flex justify-between">
                <h3 className="news-head">
                  {news.title.length >= 60
                    ? news.title.substring(0, 60) + "..."
                    : news.title}{" "}
                </h3>
              </div>
              <p className="news-para">
                {news.title.length >= 100
                  ? news.title.substring(0, 100) + "..."
                  : news.title}
              </p>
              <div className=" flex justify-between items-center news-bottom">
                <div className="flex justify-between">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={news?.image || DemoNewsImage}
                      alt="icon"
                    />
                  </div>
                  <p className="text-xs ml-1 mt-2 text-[#ffffff]">
                    {news?.sourceName}
                  </p>
                </div>
                <div className="news-time-div">
                  <p className="news-time-text">
                    {moment(news?.publishedAt).format("Do MMMM, YYYY")}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
