import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  //   token: token || null,
  isAuthenticated: false,
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
      console.log("payload", action.payload);

      //   state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
