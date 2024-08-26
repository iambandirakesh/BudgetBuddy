import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { useState, useEffect } from "react";
function App() {
  const [incomeData, setIncomeData] = useState([]);
  const [newIncome, setnewIncome] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  useEffect(() => {
    fetch("https://budgetbuddy-backend-qttd.onrender.com/api/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwttoken: window.localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          console.log(res);
          setExpenseData(res.expensesData);
        } else {
          throw new Error(`${res.message}`);
        }
      })
      .catch((e) => {
        // window.alert(e.message);
        console.log(e.message);
      });
  }, [newIncome]);
  useEffect(() => {
    fetch("https://budgetbuddy-backend-qttd.onrender.com/api/income", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwttoken: window.localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setIncomeData(res.incomesData);
        } else {
          throw new Error(`${res.message}`);
        }
      })
      .catch((e) => {
        // window.alert(e.message);
        // window.alert("Income Page");
        console.log(e.message);
      });
  }, [newIncome]);
  const handleNewIncome = () => {
    setnewIncome(!newIncome);
  };
  const handleSubmit = (money, addIncome) => {
    fetch(`https://budgetbuddy-backend-qttd.onrender.com/api/${money}`, {
      method: "POST",
      body: JSON.stringify(addIncome),
      headers: {
        "Content-Type": "application/json",
        jwttoken: window.localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          window.alert(`${money} Added Succesfully`);
          setnewIncome(!newIncome);
        } else {
          throw new Error(`${res.message}`);
        }
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };
  const handleDelete = (page, id) => {
    fetch(`https://budgetbuddy-backend-qttd.onrender.com/api/${page}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        jwttoken: window.localStorage.getItem("jwttoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          window.alert(`${page} Deleted Succesfully`);
          handleNewIncome();
        } else {
          throw new Error(`${res.message}`);
        }
      });
  };
  const IncomeAmount = incomeData.map((item) => item.amount);
  const expensesAmounts = expenseData.map((item) => item.amount);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<Login handleNewIncome={handleNewIncome} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Home
                incomeData={incomeData}
                handleSubmit={handleSubmit}
                handleNewIncome={handleNewIncome}
                expenseData={expenseData}
                handleDelete={handleDelete}
                IncomeAmount={IncomeAmount}
                expensesAmounts={expensesAmounts}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
