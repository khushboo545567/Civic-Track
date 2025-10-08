import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// import Cookies from "js-cookie";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // THIS WORKS BUT WITH HTTPONLY:FALSE , THAT MAKE TOKEN TO BE ACCESS FORM THE JS THIS IS NOT SAFE SO , MAKE THE DB CALL TO VERIFY THE USER AUTH

  // useEffect(() => {
  //   const token = Cookies.get("accessToken"); // adjust the key you're using
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  // const handleLoginState = (value) => {
  //   setIsLoggedIn(value);
  //   if (!value) {
  //     Cookies.remove("accessToken");
  //   }
  // };

  // 👋👋👋👋👋

  // IN PRODUCTION LEVEL USE THE DB CALL
  useEffect(() => {
    axios
      .get("https://civic-track-e6hx.onrender.com/api/v1/users/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUser(response.data);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ setIsLoggedIn }} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
