import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
  },
  reducers: {
    profileReducer: (state, action) => {
      state.user = action.payload;
    },
    LogOut: (state) => {
      state.user = null;
    },
  },
});

export const { profileReducer } = profileSlice.actions;

export default profileSlice.reducer;
