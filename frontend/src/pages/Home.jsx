import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfileOptions } from "../components/Info";
import Income from "./Income";
import Expenses from "./Expenses";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";

function Home({
  incomeData,
  handleSubmit,
  handleNewIncome,
  expenseData,
  handleDelete,
  IncomeAmount,
  expensesAmounts,
}) {
  const [userData, setUserData] = useState({});
  const [active, setActive] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5555/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwttoken: window.localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setUserData(res.userData);
        } else {
          throw new Error(`${res.message}`);
        }
      })
      .catch((e) => {
        // window.alert(e.message);
        console.log(e.message);
        navigate("/login");
        // window.alert("HomePage");
      });
  }, [navigate]);

  let totalIncomeAmount = incomeData.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  let totalExpenseAmount = expenseData.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen p-4 bg-pink-50 gap-10">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative lg:w-1/6 w-64 bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div>
          <div className="text-2xl font-bold text-center mb-4">
            Budget Buddy
          </div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={
                userData.gender === "male"
                  ? "https://i.ibb.co/2Zts2Jz/images-2-jpeg.jpg"
                  : "https://i.ibb.co/F7nzzrG/images-3-jpeg.jpg"
              }
              alt="user-profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{userData.name}</div>
              <div
                className={`text-xl ${
                  totalIncomeAmount - totalExpenseAmount >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${totalIncomeAmount - totalExpenseAmount}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {UserProfileOptions.map((item, idx) => (
              <div
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                  active === idx + 1 ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActive(idx + 1);
                  setIsSidebarOpen(false); // Close sidebar on selection in mobile
                }}
                key={idx}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-auto">
          <Link to="/login" className="flex items-center gap-2">
            <span className="material-symbols-outlined">logout</span>
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 w-full bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col">
        {active === 1 && (
          <Dashboard
            incomeData={incomeData}
            expenseData={expenseData}
            IncomeAmount={IncomeAmount}
            expensesAmounts={expensesAmounts}
            totalExpenseAmount={totalExpenseAmount}
            totalIncomeAmount={totalIncomeAmount}
          />
        )}
        {active === 2 && (
          <Transactions
            incomeData={incomeData}
            expenseData={expenseData}
            handleDelete={handleDelete}
          />
        )}
        {active === 3 && (
          <Income
            incomeData={incomeData}
            handleSubmit={handleSubmit}
            handleNewIncome={handleNewIncome}
            handleDelete={handleDelete}
          />
        )}
        {active === 4 && (
          <Expenses
            expenseData={expenseData}
            handleSubmit={handleSubmit}
            handleNewIncome={handleNewIncome}
            handleDelete={handleDelete}
          />
        )}
        {active === 5 && <div>Settings</div>}
      </div>
    </div>
  );
}

export default Home;
