import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import useRequest from "./useRequest";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
  // states for information
  const [formValues, setFormValues] = useState({
    account_number: "",
    balance: 0,
    currency: 0,
  });
  const { currencies } = useSelector((state) => state.currency);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { createAccount, getCurrencies } = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.balance !== 0 &&
      formValues.account_number !== "" &&
      formValues.currency !== 0
    ) {
      try {
        await createAccount(formValues);
        setFormValues({ account_number: "", balance: 0, currency: 0 });
        return window.alert("Bank Account Created!");
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("All fields must be filled");
  };

  return (
    <div className="SignUpContainer">
      <Form onSubmit={handleSubmit} className="SigunUpFormItems">
        <h2>Add Account</h2>
        <Form.Group className="my-2">
          <Form.Label>Bank Account</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write your Bank account..."
            value={formValues.account_number}
            name="account_number"
            onChange={handleFormChange}
          />
          <Form.Label>Initial Balance</Form.Label>
          <Form.Control
            type="number"
            value={formValues.balance}
            name="balance"
            onChange={handleFormChange}
          />
          <Form.Label>Currency</Form.Label>
          <Form.Select
            className="mb-3"
            name="currency"
            onChange={handleFormChange}
          >
            <option>Select a currency...</option>
            {Object.entries(currencies).length !== 0
              ? currencies.map((option) => (
                  <option
                    key={`${option.currency}-${option.symbol}`}
                    value={option.currency}
                  >{`${option.acronym} (${option.symbol})`}</option>
                ))
              : ""}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="buttonSubmit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default AddAccount;
