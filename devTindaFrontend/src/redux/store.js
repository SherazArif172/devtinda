import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import authReducer from "./auth/authslice";
import { profileApi } from "./profile/profileApi";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});
