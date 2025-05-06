import { createSlice } from "@reduxjs/toolkit";

const isAuthenticated = localStorage.getItem("isAuthenticated") || false;
const initialState = {
  user: null,
  //   token: token || null,
  isAuthenticated,
  isLoading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
      //   state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
