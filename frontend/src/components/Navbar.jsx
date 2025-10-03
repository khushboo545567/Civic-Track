import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="bg-white flex justify-between px-20 py-4 border-b border-gray-300">
      <div>
        <h1 className="text-orange-500 text-3xl font-bold">CivicTrack</h1>
      </div>
      <div className="flex gap-3">
        {isLoggedIn ? (
          <>
            <button
              className="bg-black text-white px-4 py-2 rounded-xl"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-xl">
              MyIssue
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-xl">
              Report Issue
            </button>
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
