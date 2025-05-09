import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
  },
  reducers: {
    profileReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { profileReducer } = profileSlice.actions;

export default profileSlice.reducer;
