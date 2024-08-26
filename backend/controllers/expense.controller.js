import Expense from "../models/expenses.model.js";
export const createexpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const newexpense = await Expense.create({
      ...expenseData,
      userId: req.user.id,
    });
    res.status(201).send({ status: true, newExpense: newexpense });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
export const getAllexpenses = async (req, res) => {
  try {
    const userData = req.user;
    const expenses = await Expense.find({ userId: userData.id });
    res.status(200).send({ status: true, expensesData: expenses });
  } catch (err) {
    res.status(401).send({
      status: false,
      message: err.message,
    });
  }
};
export const getexpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const expenseData = await Expense.findById(expenseId);
    res.status(200).send(expenseData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const updateexpenseByid = async (req, res) => {
  try {
    const newexpenseData = Expense.updateOne(req.params.expenseId, req.body);
    res.status(200).send(newexpenseData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const deleteexpenseById = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res
      .status(200)
      .send({ status: true, message: "expense Record deleted Successfully" });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};
