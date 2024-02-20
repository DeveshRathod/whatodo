// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";

const PrivateRoute = ({ element }) => {
  const isAuth = useRecoilValue(authState);
  return isAuth ? <Outlet /> : "";
};

export default PrivateRoute;
