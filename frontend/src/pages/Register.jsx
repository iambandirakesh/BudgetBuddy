import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [registerUserData, setRegisterUserData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFieldChange = (key) => (e) => {
    const value = e.target.value;
    setRegisterUserData((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
    console.log(registerUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(registerUserData));
    if (confirmPassword !== registerUserData.password) {
      window.alert("Passwords do not match");
    } else {
      fetch("https://budgetbuddy-backend-qttd.onrender.com/api/user", {
        method: "POST",
        body: JSON.stringify(registerUserData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status) {
            alert(`Hi ${res.userData.name}, Account Created Successfully.`);
            navigate("/login");
          } else {
            throw new Error(`${res.message}`);
          }
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.message);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center">
      <div className="bg-[rgba(150,165,165,0.3)] p-8 rounded-xl border border-slate-500 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl text-center mb-5">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={handleFieldChange("name")}
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              onChange={handleFieldChange("phone")}
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 mb-4"
            />
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
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 w-72 bg-transparent border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <div className="flex items-center mb-4">
              <label className="mr-4 text-lg">Gender:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleFieldChange("gender")}
                  className="mr-2"
                />
                <label htmlFor="male" className="mr-4 text-sm">
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleFieldChange("gender")}
                  className="mr-2"
                />
                <label htmlFor="female" className="text-sm">
                  Female
                </label>
              </div>
            </div>
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
            <Link to="/login" className="ml-auto text-sm">
              <span className="text-500">Already have Account?</span>
            </Link>
          </div>
          <div className="flex justify-center mt-4">
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

export default Register;
