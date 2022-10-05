import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRequest from "./useRequest";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { register } = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const passwordConfirmed = () => {
    if (values.password === confirmPassword) return true;
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      values.username === "" ||
      values.email === "" ||
      values.password === ""
    ) {
      return window.alert("All fields must be filled");
    }

    if (!passwordConfirmed()) return window.alert("Passwords do not match");

    try {
      await register(values);
      window.alert("User Created, Proceeding To Log In");
      setValues({ email: "", username: "", password: "" });
      setConfirmPassword("");
      return navigate("/login", { replace: true });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className="SignUpContainer">
      <Form className="SigunUpFormItems" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <Form.Group className="my-4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Write your username..."
            value={values.username}
            onChange={handleInputChange}
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Write your email..."
            value={values.email}
            onChange={handleInputChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Set your password..."
            value={values.password}
            onChange={handleInputChange}
          />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Set your password..."
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="buttonSubmit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
