import React from "react";

function Transactions({ incomeData, expenseData, handleDelete }) {
  return (
    <div className="flex flex-col p-3 gap-4">
      <div className="h">
        <h2 className="text-center text-xl font-semibold">All Transactions</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="h">
          <h3 className="text-lg font-semibold">Incomes</h3>
          <div className="income-table">
            {incomeData.map((item) => (
              <div className="income-data" key={item._id}>
                <div className="symbol">
                  <span className="material-symbols-outlined">
                    attach_money
                  </span>
                </div>
                <div className="income-data-info w-5/6">
                  <div className="income-name">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.category === "Income"
                          ? "bg-green-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <h3 className="text-md font-medium">{item.category}</h3>
                  </div>
                  <div className="income-data-info-about-money">
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        attach_money
                      </span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      <span>{item.date.slice(0, 10)}</span>
                    </div>
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        chat_bubble
                      </span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="income-delete"
                  onClick={() => handleDelete("income", item._id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="transactions-expense-data">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <div className="income-table">
            {expenseData.reverse().map((item) => (
              <div className="income-data" key={item._id}>
                <div className="symbol">
                  <span className="material-symbols-outlined">
                    attach_money
                  </span>
                </div>
                <div className="income-data-info w-5/6 ">
                  <div className="income-name">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.category === "Expense"
                          ? "bg-red-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <h3 className="text-md font-medium">{item.category}</h3>
                  </div>
                  <div className="income-data-info-about-money">
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        attach_money
                      </span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      <span>{item.date.slice(0, 10)}</span>
                    </div>
                    <div className="income-data-info-about-money-amount">
                      <span className="material-symbols-outlined">
                        chat_bubble
                      </span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="income-delete"
                  onClick={() => handleDelete("expenses", item._id)}
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

export default Transactions;
