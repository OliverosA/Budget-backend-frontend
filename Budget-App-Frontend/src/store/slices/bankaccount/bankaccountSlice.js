import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: {},
  bankIdList: [],
  selectedAccount: {},
  incomesSummary: {},
  expensesSummary: {},
};

export const bankaccountSlice = createSlice({
  name: "bankaccount",
  initialState,
  reducers: {
    setAllAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setBankIdList: (state, action) => {
      state.bankIdList = [...state.bankIdList, action.payload];
    },
    clearBankIdList: (state) => {
      state.bankIdList = [];
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    clearSelectedAccount: (state) => {
      state.selectedAccount = {};
    },
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setIncomesSummary: (state, action) => {
      state.incomesSummary = action.payload;
    },
    setExpenseSummary: (state, action) => {
      state.expensesSummary = action.payload;
    },
    clearSums: (state) => {
      state.incomesSummary = [];
      state.expensesSummary = [];
    },
    clearAll: (state) => {
      state.accounts = {};
      state.bankIdList = [];
      state.selectedAccount = {};
      state.incomesSummary = {};
      state.expensesSummary = {};
    },
  },
});

export const {
  setAllAccounts,
  setBankIdList,
  clearBankIdList,
  setSelectedAccount,
  clearSelectedAccount,
  updateAccounts,
  setIncomesSummary,
  setExpenseSummary,
  clearSums,
  clearAll,
} = bankaccountSlice.actions;

export default bankaccountSlice.reducer;
