import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeader = {
  "x-rapidapi-host": "newsi-api.p.rapidapi.com",
  "x-rapidapi-key": "21d65a5c87mshd7a56e79ec0552ap1988a3jsn0c5fe959e062",
};

const baseUrl = "https://newsi-api.p.rapidapi.com/api/category";

const createRequest = (url) => ({ url, headers: cryptoNewsHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `?category=${newsCategory}&language=en&country=us&sort=top&page=1&limit=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
