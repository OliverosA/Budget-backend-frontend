import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
