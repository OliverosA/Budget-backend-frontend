import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/budgetLogo.png";
import NavigationItem from "./NavigationItem";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";

const Navigationbar = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Budget
          </Navbar.Brand>
          <NavigationItem
            isLoggedIn={isLoggedIn}
            username={currentUser.username}
            email={currentUser.email}
          />
        </Container>
      </Navbar>
      {isLoggedIn ? <SideBar /> : ""}
    </>
  );
};

export default Navigationbar;
