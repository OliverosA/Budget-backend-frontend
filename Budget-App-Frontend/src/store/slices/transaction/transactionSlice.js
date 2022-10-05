import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: {},
  bankAccountTransactions: {},
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setAllTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setBankAccountTransactions: (state, action) => {
      state.bankAccountTransactions = action.payload;
    },
    clearAllTransactions: (state) => {
      state.transactions = {};
    },
    clearBankAccountTransactions: (state) => {
      state.bankAccountTransactions = {};
    },
  },
});

export const {
  setAllTransactions,
  setBankAccountTransactions,
  clearAllTransactions,
  clearBankAccountTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
