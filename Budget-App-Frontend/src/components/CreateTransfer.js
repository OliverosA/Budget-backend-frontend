import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import useRequest from "./useRequest";
import { useNavigate } from "react-router-dom";

const CreateTransfer = () => {
  const [transferValues, setTransferValues] = useState({
    amount: 0,
    description: "",
    orig_account: "",
    dest_account: "",
  });
  const [accountBalance, setAccountBalance] = useState("0");
  const { accounts } = useSelector((state) => state.bankaccount);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { getAccountCurrencySymbol, getTransactionTypes, CreateTransfer } =
    useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, []);

  useEffect(() => {
    getTransactionTypes();
  }, []);

  const checkBalance = (amount) => {
    const balance = accountBalance.split(" ");
    if (amount <= Number(balance[1])) return true;
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      Number(transferValues.amount) >= 1 &&
      transferValues.orig_account !== "" &&
      transferValues.dest_account !== ""
    ) {
      if (transferValues.orig_account === transferValues.dest_account) {
        return window.alert("Accounts cannot be the same");
      }
      if (!checkBalance(Number(transferValues.amount))) {
        return window.alert(
          "The amount must be less than or equal to the account balance"
        );
      }

      const response = await CreateTransfer({ ...transferValues });

      setAccountBalance("0");
      setTransferValues({
        amount: 0,
        description: "",
        orig_account: "",
        dest_account: "",
      });
      return window.alert(response);
    }
    if (Number(transferValues.amount) < 1)
      return window.alert("The amount must be greater than 1");
    return window.alert("All fields must be filled");
  };
  const getAccountBalance = (account_number) => {
    if (account_number !== undefined) {
      const account = accounts.find(
        (item) => item.account_number === account_number
      );
      if (account !== undefined) {
        setTransferValues({
          ...transferValues,
          ["orig_account"]: account.account_number,
        });
        return setAccountBalance(
          `${getAccountCurrencySymbol(account.currency)} ${account.balance}`
        );
      }
    }
    setTransferValues({
      ...transferValues,
      ["orig_account"]: "",
    });
    return setAccountBalance(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransferValues({
      ...transferValues,
      [name]: value,
    });
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
            name="orig_account"
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
            value={transferValues.amount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Select Destination Account</Form.Label>
          <Form.Control
            type="text"
            name="dest_account"
            placeholder="Enter destination account..."
            value={transferValues.dest_account}
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
            value={transferValues.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Create Transaction
        </Button>
      </Form>
    </div>
  );
};

export default CreateTransfer;
