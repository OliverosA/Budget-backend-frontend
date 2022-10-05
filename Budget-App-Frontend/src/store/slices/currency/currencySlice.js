import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: {},
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setAllCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
  },
});

export const { setAllCurrencies, setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
