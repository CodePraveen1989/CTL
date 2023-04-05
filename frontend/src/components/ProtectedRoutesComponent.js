import { Outlet, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Navb from "./Navb";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SplashPage from "../pages/SplashPage";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      return isAuth;
    });
  }, [isAuth]);

  if (isAuth === undefined) return <SplashPage />;

  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" replace={true} />
  ) : isAuth && admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : isAuth && !admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoutesComponent;
