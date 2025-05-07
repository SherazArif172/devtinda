import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
  },
  reducers: {
    profileReducer: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { profileReducer } = profileSlice;

export default profileSlice.reducer;
