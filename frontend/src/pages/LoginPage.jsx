import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function LoginPage() {
  const { setIsLoggedIn } = useOutletContext();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        loginData,
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        toast.success("user loggedIn sussfully");
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="w-full flex justify-center pt-15 ">
      <div className="flex flex-col gap-6 w-[400px] border border-gray-400 rounded-2xl px-8 py-15 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="outline-none border px-8 py-2 rounded-2xl"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="outline-none border px-8 py-2 rounded-2xl"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-2xl"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Dont have an account?{" "}
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
