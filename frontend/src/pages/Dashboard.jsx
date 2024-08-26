import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Dashboard({
  incomeData,
  expenseData,
  IncomeAmount,
  expensesAmounts,
  totalExpenseAmount,
  totalIncomeAmount,
}) {
  const incomesDates = incomeData.map((item) => item.date.slice(0, 10));
  const expensesDates = expenseData.map((item) => item.date.slice(0, 10));
  const dates = [...new Set([...incomesDates, ...expensesDates])];
  const incomenewData = incomeData.map((item) => ({
    type: "income",
    ...item,
  }));
  const expensenewData = expenseData.map((item) => ({
    type: "expense",
    ...item,
  }));
  const totalData = [...incomenewData, ...expensenewData];
  const totalIncomeAmountsData = incomeData.map((item) => Number(item.amount));
  const totalExpenseAmountsData = expenseData.map((item) => item.amount);
  const recenthistory = totalData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className="p-4">
      <div className="md:flex md:flex-col md:gap-4 sm:flex sm:flex-col sm:gap-4 sm:overflow-scroll">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex gap-10 flex-col md:flex-row">
          <div className="flex flex-col gap-4 p-5 md:w-1/2 w-2/2">
            <div className="bg-gray-50 rounded-lg shadow-lg p-2 q md:w-2/2 md:h-64 h-58 ">
              <Line
                data={{
                  labels: dates,
                  datasets: [
                    {
                      label: "Incomes",
                      data: IncomeAmount,
                      fill: false,
                      borderColor: "rgb(75, 192, 192)",
                      tension: 0.1,
                    },
                    {
                      label: "Expenses",
                      data: expensesAmounts,
                      fill: false,
                      borderColor: "red",
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </div>
            <div className="flex gap-8">
              <div className="bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center w-48 h-20">
                <div>Total Income</div>
                <div className="text-xl">₹{totalIncomeAmount}</div>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center w-48 h-20">
                <div>Total Expenses</div>
                <div className="text-xl">₹{totalExpenseAmount}</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-4 flex items-center justify-center w-80 h-24">
              <div className="flex flex-col items-center">
                <div>Total Balance</div>
                <div
                  className={`text-xl ${
                    totalIncomeAmount - totalExpenseAmount >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ₹{totalIncomeAmount - totalExpenseAmount}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:w-1/2">
            <div className="bg-gray-50 rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold">Recent History</h3>
              <div className="flex flex-col gap-4">
                {recenthistory.map((item, idx) => (
                  <div
                    className="bg-gray-50 rounded-lg shadow-lg p-2 flex items-center justify-between w-2/2 h-8"
                    key={idx}
                  >
                    <div
                      className={`text-lg ${
                        item.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.category}
                    </div>
                    <div
                      className={`text-lg ${
                        item.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Min</h4>
                <h3 className="font-semibold">Income</h3>
                <h4 className="font-semibold">Max</h4>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-lg shadow-lg p-2 h-12">
                <div>₹{Math.min(...totalIncomeAmountsData)}</div>
                <div>₹{Math.max(...totalIncomeAmountsData)}</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Min</h4>
                <h3 className="font-semibold">Expenses</h3>
                <h4 className="font-semibold">Max</h4>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-lg shadow-lg p-2 h-12">
                <div>₹{Math.min(...totalExpenseAmountsData)}</div>
                <div>₹{Math.max(...totalExpenseAmountsData)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
