import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // install lucide-react if not: npm install lucide-react

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggedIn(false);
        toast.success("User logged out successfully.");
        navigate("/"); // redirect to home
      })
      .catch((err) => {
        console.error("User not logged out", err);
        toast.error("Something went wrong");
      });
  };

  const handleReportClick = () => {
    if (isLoggedIn) {
      navigate("/report-issue");
    } else {
      toast.warn("Please login to report an issue!");
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <h1 className="text-orange-500 text-3xl font-bold tracking-wide">
            Civic<span className="text-black">Track</span>
          </h1>
        </NavLink>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t md:border-none shadow-md md:shadow-none`}
        >
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Logout
              </button>

              <NavLink to="/profile">
                <button className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  My Issues
                </button>
              </NavLink>

              <button
                onClick={handleReportClick}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Report Issue
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register">
                <button className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Register
                </button>
              </NavLink>

              <NavLink to="/login">
                <button className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Login
                </button>
              </NavLink>
              <NavLink>
                <button
                  onClick={handleReportClick}
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Report Issue
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
