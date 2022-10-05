import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) return children;

  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
