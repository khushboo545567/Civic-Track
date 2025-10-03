import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
  });
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
      console.log(response.data);

      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        toast.success("User registered successfully");
      }
    } catch (error) {
      console.log("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="w-full flex justify-center mt-10 pt-15">
      <div className="flex flex-col gap-6 w-[400px] border border-gray-400 rounded-2xl px-8 py-14">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <input
            type="number"
            placeholder="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-2xl mt-4"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
