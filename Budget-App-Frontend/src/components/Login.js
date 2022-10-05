import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import userImage from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRequest from "./useRequest";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useRequest();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.email !== "" && values.password !== "") {
      try {
        const response = await login(values);
        if (response !== undefined) window.alert(response);
        return navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("All fields must be filled");
  };

  return (
    <div className="LoginFormContainer">
      <Form className="FormItems" onSubmit={handleSubmit}>
        <img src={userImage} className="userImage" alt="UserImage" />
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Write your email..."
            value={values.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Set your password..."
            value={values.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
