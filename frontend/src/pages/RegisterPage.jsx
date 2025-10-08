import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        formData,
        { withCredentials: true }
      );

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />
          <input
            type="number"
            placeholder="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl mt-3 hover:bg-gray-800 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
