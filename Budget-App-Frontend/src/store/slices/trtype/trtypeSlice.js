import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trtypes: {},
};

export const trtypeSlice = createSlice({
  name: "trtype",
  initialState,
  reducers: {
    setAllTypes: (state, action) => {
      state.trtypes = action.payload;
    },
  },
});

export const { setAllTypes } = trtypeSlice.actions;

export default trtypeSlice.reducer;
