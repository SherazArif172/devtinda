import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/profile",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/view",
        method: "GET",
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
