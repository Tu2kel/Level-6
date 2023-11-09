import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { token, children } = props;
  return token ? children : <Navigate to="/" />;
  /* If the token is true, return the children, else navigate home*/
}
