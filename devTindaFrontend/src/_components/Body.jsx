import React from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Login from "./Login";
import { useSelector } from "react-redux";

const Body = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Navbar />
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      <Footer />
    </div>
  );
};

export default Body;
