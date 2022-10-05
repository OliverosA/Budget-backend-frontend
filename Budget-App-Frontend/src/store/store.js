import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth/authSlice";
import bankaccount from "./slices/bankaccount/bankaccountSlice";
import currency from "./slices/currency/currencySlice";
import transaction from "./slices/transaction/transactionSlice";
import category from "./slices/category/categorySlice";
import trtype from "./slices/trtype/trtypeSlice";

export const store = configureStore({
  reducer: {
    auth,
    bankaccount,
    currency,
    transaction,
    category,
    trtype,
  },
});
