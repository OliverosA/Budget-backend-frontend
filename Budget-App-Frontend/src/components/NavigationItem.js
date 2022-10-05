import React from "react";
import { Nav, Dropdown, Stack, ButtonGroup, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import useRequest from "./useRequest";

const NavigationItem = ({ isLoggedIn, username, email }) => {
  const { logout } = useRequest();

  const HandleLogout = async (e) => {
    e.preventDefault();
    try {
      logout();
      isLoggedIn = !isLoggedIn;
      return <Navigate to={"/login"} replace />;
    } catch {
      console.log("error to logout");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Accounts Summary
            </Nav.Link>
            <Nav.Link as={Link} to="/history">
              Transactions History
            </Nav.Link>
            <Nav.Link as={Link} to="/addAccount">
              Create Account
            </Nav.Link>
            <Nav.Link as={Link} to="/addCategory">
              Create Category
            </Nav.Link>
            <Nav.Link as={Link} to="/createTransaction">
              Exp/Inc
            </Nav.Link>
            <Nav.Link as={Link} to="/createTransfer">
              Tansfer
            </Nav.Link>
          </Nav>
          <Nav className="me-right">
            <Dropdown as={ButtonGroup}>
              <Button
                variant="success"
                size="sm"
              >{`${username} - ${email}`}</Button>
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={HandleLogout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </>
      ) : (
        <>
          <Nav className="me-right">
            <Stack direction="horizontal" gap={2}>
              <Button variant={"info"} size={"sm"} as={Link} to="/login">
                Log In
              </Button>
              <Button variant={"warning"} size={"sm"} as={Link} to="/signup">
                Sign Up
              </Button>
            </Stack>
          </Nav>
        </>
      )}
    </>
  );
};

export default NavigationItem;
