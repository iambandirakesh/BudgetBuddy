import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleNewIncome }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const handleFieldChange = (key) => (e) => {
    const value = e.target.value;
    setUserData((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
    console.log(userData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://budgetbuddy-backend-qttd.onrender.com/api/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          window.localStorage.setItem("jwttoken", res.jwttoken);
          handleNewIncome();
          navigate("/");
        } else {
          throw new Error(`${res.message}`);
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center">
      <div className="bg-[rgba(150,165,165,0.3)] p-8 rounded-xl border border-slate-500 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl text-center mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleFieldChange("email")}
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleFieldChange("password")}
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="mr-2 w-4 h-4"
            />
            <label htmlFor="rememberMe" className="text-white text-sm">
              Remember me
            </label>
          </div>
          <div className="flex justify-between mb-4">
            <Link to="/forgot-password" className="text-blue-500">
              Forgot Password
            </Link>
            <Link to="/register" className="text-blue-500">
              Register?
            </Link>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="h-10 w-24 rounded-lg border-none bg-blue-500 text-white shadow-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
