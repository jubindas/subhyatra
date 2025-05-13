import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
