import React, { useEffect, useState } from "react";
import Category from "./Category";
import TransactionsTable from "./TransactionsTable";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import useRequest from "./useRequest";
import { clearSelectedCategory } from "../store/slices/category/categorySlice";
import { clearSelectedAccount } from "../store/slices/bankaccount/bankaccountSlice";

const History = () => {
  const { accounts, selectedAccount } = useSelector(
    (state) => state.bankaccount
  );
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState([]); // filtered transactions
  const { transactions } = useSelector((state) => state.transaction);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { selectedCategory } = useSelector((state) => state.category);
  const [filterValues, setFilterValues] = useState({
    account_number: "",
    date: "",
    category: 0,
  });
  const { getTransactions, getCurrencies, getCategories } = useRequest();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrencies();
    getCategories();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, []);

  useEffect(() => {
    setFilterValues({
      ...filterValues,
      ["category"]: selectedCategory.category,
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (
      Object.entries(selectedAccount).length !== 0 &&
      Object.entries(transactions).length !== 0
    ) {
      const result = transactions.filter(
        (transaction) => transaction.bankaccount === selectedAccount.bankaccount
      );
      if (result !== undefined || Object.entries(result).length !== 0) {
        setDisabled(true);
        return setSearch(result);
      }
    }
  }, []);

  useEffect(() => {
    if (
      Object.entries(selectedAccount).length !== 0 &&
      Object.entries(transactions).length !== 0
    ) {
      const result = transactions.filter(
        (transaction) => transaction.bankaccount === selectedAccount.bankaccount
      );
      if (result !== undefined || Object.entries(result).length !== 0) {
        setDisabled(true);
        setSearch(result);
      }
    }
  }, [selectedAccount]);

  const getBankAccount = (account_number) => {
    if (Object.entries(accounts).length !== 0) {
      const bankaccount = accounts.find(
        (account) => account.account_number === account_number
      );
      if (bankaccount !== undefined) return bankaccount.bankaccount;
    }
    return "";
  };

  const searchAccountSelected = () => {
    if (filterValues.date !== "") {
      const filteredTransactions = search.filter(
        (transaction) => transaction.add_date === filterValues.date
      );
      return setSearch(filteredTransactions); //filtered transactions
    }

    if (filterValues.category !== 0 && filterValues.category !== undefined) {
      const filteredTransactions = search.filter(
        (transaction) => transaction.category === filterValues.category
      );
      return setSearch(filteredTransactions);
    }
  };

  const searchItems = async () => {
    if (Object.entries(selectedAccount).length !== 0) {
      return searchAccountSelected();
    }
    if (filterValues.account_number !== "") {
      const filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.bankaccount ===
          getBankAccount(filterValues.account_number)
      );
      if (filteredTransactions !== undefined)
        return setSearch(filteredTransactions); //filtered transactions
    }

    if (filterValues.date !== "") {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.add_date === filterValues.date
      );
      if (filteredTransactions !== undefined)
        return setSearch(filteredTransactions); //filtered transactions
    }

    if (filterValues.category !== 0 && filterValues.category !== undefined) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.category === filterValues.category
      );
      if (filteredTransactions !== undefined)
        return setSearch(filteredTransactions); //filtered transactions
    }
    return setSearch([]);
  };

  const clearAccountValue = () => {
    dispatch(clearSelectedCategory());
    setFilterValues({
      ...filterValues,
      ["account_number"]: "",
    });
    getTransactions();
  };

  const clearDateInput = () => {
    dispatch(clearSelectedCategory());
    setFilterValues({ ...filterValues, ["date"]: "" });
    getTransactions();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const handleShowAllClick = () => {
    setDisabled(false);
    setSearch([]);
    dispatch(clearSelectedAccount());
    dispatch(clearSelectedCategory());
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return Object.entries(transactions).length === 0 ? (
    <div className="centerItemsLayout">
      <Alert variant="danger">
        <Alert.Heading>
          It looks like you don't have any transactions yet.
        </Alert.Heading>
        <h4>Make a transaction to view it here</h4>
      </Alert>
    </div>
  ) : (
    <>
      <div className="filters">
        <input
          className="filterInput"
          type="date"
          id="date"
          placeholder="Search date..."
          name="date"
          value={filterValues.date}
          onChange={handleFormChange}
          onClick={clearAccountValue}
        />
        <input
          type={"text"}
          className="filterInput"
          placeholder="Accounts List..."
          list="accountsList"
          name="account_number"
          onChange={handleFormChange}
          value={filterValues.account_number}
          onClick={clearDateInput}
          disabled={disabled}
        />
        <datalist id="accountsList">
          {Object.entries(accounts).length !== 0
            ? accounts.map((account) => (
                <option
                  key={account.bankaccount}
                  value={account.account_number}
                ></option>
              ))
            : ""}
        </datalist>
        <Category />
        <Button variant="warning" onClick={searchItems}>
          Search
        </Button>
      </div>
      <div className="transactionsButtons">
        <Button variant="success" onClick={handleShowAllClick}>
          Show All Transactions
        </Button>
      </div>
      {search.length === 0 && Object.entries(transactions).length !== 0 ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <TransactionsTable transactions={search} />
      )}
    </>
  );
};

export default History;
