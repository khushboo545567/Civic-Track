// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// function LoginPage() {
//   const { setIsLoggedIn } = useOutletContext();
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/users/login",
//         loginData,
//         { withCredentials: true }
//       );
//       // console.log(response.data);
//       if (response.data.statusCode == 200 || response.data.statusCode == 201) {
//         toast.success("user loggedIn sussfully");
//         setIsLoggedIn(true);
//         navigate("/");
//       }
//     } catch (error) {
//       console.log("Error:", error.response?.data?.message || error.message);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };
//   return (
//     <div className="w-full flex justify-center pt-15 ">
//       <div className="flex flex-col gap-6 w-[400px] border border-gray-400 rounded-2xl px-8 py-15 ">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//             className="outline-none border px-8 py-2 rounded-2xl"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={loginData.password}
//             onChange={handleChange}
//             className="outline-none border px-8 py-2 rounded-2xl"
//           />
//           <button
//             type="submit"
//             className="bg-black text-white py-2 rounded-2xl"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center">
//           Dont have an account?{" "}
//           <NavLink to="/register" className="text-blue-500 hover:underline">
//             Register
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// }
// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext, useNavigate, NavLink } from "react-router-dom";

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

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast.success("User logged in successfully");
        setIsLoggedIn(true);
        navigate("/");
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
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl mt-3 hover:bg-gray-800 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
