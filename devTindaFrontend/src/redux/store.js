import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApiSlice";
import authReducer from "./auth/authslice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
