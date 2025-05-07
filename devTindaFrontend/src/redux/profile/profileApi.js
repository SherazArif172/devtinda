import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/profile",
    credentials: "include",
  }),
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
  endpoints: (builder) => ({
    profileView: builder.query({
      query: () => ({
        url: "/view",
        method: "GET",
      }),
      onQuerySuccess: (response) => {
        console.log("profile view", response);
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useProfileViewQuery } = profileApi;
