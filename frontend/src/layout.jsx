import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ setIsLoggedIn }} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
