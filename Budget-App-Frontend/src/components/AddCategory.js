import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import useRequest from "./useRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const { createCategory } = useRequest();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
    if (formValues.name !== "") {
      try {
        await createCategory(formValues);
        setFormValues({ name: "", description: "" });
        return window.alert("Category Created!");
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("The Category need a name");
  };

  return (
    <div className="SignUpContainer">
      <Form onSubmit={handleSubmit} className="SigunUpFormItems">
        <h2>Create Category</h2>
        <Form.Group className="my-2">
          <Form.Label as={"h4"}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write The Name..."
            value={formValues.name}
            name="name"
            onChange={handleFormChange}
          />
          <Form.Label as={"h4"}>Description </Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Write a description (optional) ..."
            value={formValues.description}
            name="description"
            onChange={handleFormChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="buttonSubmit">
          Create Category
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
