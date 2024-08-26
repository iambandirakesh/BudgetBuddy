import React, { useState } from "react";

function Income({ incomeData, handleSubmit, handleDelete }) {
  const [addIncome, setAddIncome] = useState({});

  const CalculateTotalIncome = () => {
    return incomeData.reduce((total, item) => total + item.amount, 0);
  };

  const handleInputField = (key) => (e) => {
    setAddIncome((prevFields) => ({
      ...prevFields,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="p-4">
      <div className="p-5 mb-4">
        <h2 className="text-2xl font-semibold">Incomes</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex h-18 p-4 w-full bg-[rgb(255,254,254)] rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.5)] items-center justify-center">
          <h2 className="text-lg">
            Total Income:
            <span className="text-green-500 ml-2">
              ${CalculateTotalIncome()}
            </span>
          </h2>
        </div>
        <div className=" flex flex-col md:flex-row gap-4">
          <div className="new-income-submit bg-gray-100 p-4 rounded-lg shadow-md relative md:w-2/5">
            <form className="flex flex-col gap-4 ">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Title"
                onChange={handleInputField("category")}
                className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Amount"
                onChange={handleInputField("amount")}
                className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="date"
                name="date"
                id="date"
                placeholder="Enter a Date"
                onChange={handleInputField("date")}
                className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <textarea
                name="description"
                id="description"
                placeholder="Add a description"
                onChange={handleInputField("description")}
                className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
            </form>
            <button
              className="absolute bottom-4 left-4 bg-red-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-red-600 flex items-center gap-2"
              onClick={() => handleSubmit("income", addIncome)}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add Income</span>
            </button>
          </div>
          <div className="income-table flex flex-col gap-4 p-4 overflow-y-auto max-h-82">
            {incomeData.map((item) => (
              <div
                className="income-data bg-gray-100 p-4 rounded-lg shadow-md flex gap-4 items-center relative"
                key={item._id}
              >
                <div className="symbol text-2xl text-green-500">
                  <span className="material-symbols-outlined">
                    attach_money
                  </span>
                </div>
                <div className="income-data-info flex flex-col gap-2">
                  <div className="income-name flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">{item.category}</h3>
                  </div>
                  <div className="income-data-info-about-money flex flex-col gap-1">
                    <div className="income-data-info-about-money-amount flex items-center gap-1">
                      <span className="material-symbols-outlined">
                        attach_money
                      </span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="income-data-info-about-money-amount flex items-center gap-1">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      <span>{item.date.slice(0, 10)}</span>
                    </div>
                    <div className="income-data-info-about-money-amount flex items-center gap-1">
                      <span className="material-symbols-outlined">
                        chat_bubble
                      </span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="income-delete absolute right-4 cursor-pointer text-red-500 text-2xl"
                  onClick={() => handleDelete("income", item._id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
