import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to={<Login />} />;
};

export default PrivateRoute;
