import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggedIn(false);
        toast.success("User logged out sussfully.");
      })
      .catch((err) => {
        console.log("User not logged out", err);
        toast.error("something went wrong ");
      });
  };
  return (
    <div className="bg-white flex justify-between px-20 py-4 border-b border-gray-300">
      <div>
        <NavLink to="/">
          <h1 className="text-orange-500 text-3xl font-bold">CivicTrack</h1>
        </NavLink>
      </div>
      <div className="flex gap-3">
        {isLoggedIn ? (
          <>
            <button
              className="bg-black text-white px-4 py-2 rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-xl">
              MyIssue
            </button>
            <NavLink to="/report-issue">
              <button className="bg-black text-white px-4 py-2 rounded-xl">
                Report Issue
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <button className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer">
                Login
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;
