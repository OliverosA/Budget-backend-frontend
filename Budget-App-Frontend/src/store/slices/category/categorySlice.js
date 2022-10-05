import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {},
  selectedCategory: {},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = {};
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = {};
    },
  },
});

export const {
  setAllCategories,
  clearCategories,
  setSelectedCategory,
  clearSelectedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
