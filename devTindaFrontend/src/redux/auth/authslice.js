import { createSlice } from "@reduxjs/toolkit";

const isAuthenticated = localStorage.getItem("isAuthenticated") || false;
let user = localStorage.getItem("user") || null;
if (user) user = JSON.parse(user);
const initialState = {
  user,
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
      localStorage.setItem("user", JSON.stringify(action.payload));
      //   state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
