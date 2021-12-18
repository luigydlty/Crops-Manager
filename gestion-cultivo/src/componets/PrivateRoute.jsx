import React from "react";
import { Route,Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;  //Si el token existe, entonces renderiza el componente hijo, sino redirige al login
};

export default PrivateRoute;