import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeader = {
  "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
  "x-rapidapi-key": "21d65a5c87mshd7a56e79ec0552ap1988a3jsn0c5fe959e062",
};

const baseUrl = "https://real-time-news-data.p.rapidapi.com/search";

const createRequest = (url) => ({ url, headers: cryptoNewsHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `?query=${newsCategory}&lang=en&country=US`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
