import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useRequest from "./useRequest";
import Category from "./Category";
import { clearSelectedCategory } from "../store/slices/category/categorySlice";
import { useNavigate } from "react-router-dom";

const ExpInc = () => {
  const [transactionValues, setTransactionValues] = useState({
    amount: 0,
    description: "",
    bankaccount: 0,
  });
  const [accountBalance, setAccountBalance] = useState("0");
  const [transactionType, setTransactionType] = useState("");
  const { accounts } = useSelector((state) => state.bankaccount);
  const { selectedCategory } = useSelector((state) => state.category);
  const { trtypes } = useSelector((state) => state.trtype);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const {
    getAccountCurrencySymbol,
    getTransactionTypes,
    createIncomeTransaction,
    createExpenseTransaction,
  } = useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, []);

  useEffect(() => {
    getTransactionTypes();
    dispatch(clearSelectedCategory());
  }, []);

  const checkBalance = (amount, type) => {
    const balance = accountBalance.split(" ");
    console.log(Number(amount), Number(balance[1]));
    if (Number(amount) > Number(balance[1]) && type === "Expense") return false;
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      Number(transactionValues.amount) >= 1 &&
      transactionValues.bankaccount !== 0 &&
      Object.entries(selectedCategory).length !== 0 &&
      transactionType !== ""
    ) {
      if (!checkBalance(Number(transactionValues.amount), transactionType)) {
        return window.alert(
          "The amount must be less than or equal to the account balance"
        );
      }
      const body = {
        ...transactionValues,
        category: selectedCategory.category,
      };
      if (transactionType === "Income") {
        const response = await createIncomeTransaction(body);
        window.alert(response);
      }
      if (transactionType === "Expense") {
        const response = await createExpenseTransaction(body);
        window.alert(response);
      }
      setAccountBalance("0");
      return setTransactionValues({
        amount: 0,
        description: "",
        bankaccount: 0,
      });
    }
    if (Number(transactionValues.amount) < 1)
      return window.alert("The amount must be greater than 1");
    return window.alert("All fields must be filled");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransactionValues({
      ...transactionValues,
      [name]: value,
    });
  };

  const getAccountBalance = (account_number) => {
    if (account_number !== undefined) {
      const account = accounts.find(
        (item) => item.account_number === account_number
      );
      if (account !== undefined) {
        setAccountBalance(
          `${getAccountCurrencySymbol(account.currency)} ${account.balance}`
        );
        return setTransactionValues({
          ...transactionValues,
          ["bankaccount"]: account.bankaccount,
        });
      }
    }
    setTransactionValues({ ...transactionValues, ["bankaccount"]: 0 });
    return setAccountBalance(0);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  return Object.entries(accounts).length === 0 ? (
    <div className="centerItemsLayout">
      <Alert variant="danger">
        <Alert.Heading>Welcome To The Budget Management App!</Alert.Heading>
        <h4>
          It's seems that you don't have an account yet. Lets get started to
          manage your incomes, expenses and also your transfers beetwen other
          users accounts! So, Click on the button and create your first account!
        </h4>
        <Button
          variant="outline-success"
          onClick={() => {
            navigate("/addAccount", { replace: true });
          }}
        >
          Create Account
        </Button>
      </Alert>
    </div>
  ) : (
    <div className="transactionContainer">
      <Form className="SigunUpFormItems" onSubmit={handleSubmit}>
        <h2>Create Transaction</h2>
        <Form.Group className="my-1">
          <Form.Label>Select Origin Account</Form.Label>
          <input
            id="accountInput"
            type={"text"}
            className={"form-control"}
            placeholder="Accounts List..."
            list="accountsList"
            name="account_number"
            onChange={(e) => {
              getAccountBalance(e.target.value);
            }}
          />
          <datalist id="accountsList">
            {Object.entries(accounts).length !== 0
              ? accounts.map((account) => (
                  <option
                    key={account.bankaccount}
                    value={account.account_number}
                  >{`Balance: ${getAccountCurrencySymbol(account.currency)}${
                    account.balance
                  }`}</option>
                ))
              : ""}
          </datalist>
          <label>{`Account Balance: ${accountBalance}`}</label>
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={transactionValues.amount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            name="description"
            placeholder="Set a description (optional)..."
            value={transactionValues.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Category</Form.Label>
          <Category className="categoryForm" />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Transaction Type</Form.Label>
          <input
            id="transactionTypeInput"
            type={"text"}
            className={"form-control"}
            placeholder="Transaction Type List..."
            list="typesList"
            name="transactionType"
            onChange={handleTransactionTypeChange}
          />
          <datalist id="typesList">
            {Object.entries(trtypes).length !== 0
              ? trtypes.map((type) => (
                  <option key={type.trtype} value={type.name}></option>
                ))
              : ""}
          </datalist>
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Create Transaction
        </Button>
      </Form>
    </div>
  );
};

export default ExpInc;
