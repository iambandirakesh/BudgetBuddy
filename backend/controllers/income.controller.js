import Income from "../models/income.model.js";
import jwt from "jsonwebtoken";
export const createIncome = async (req, res) => {
  try {
    const IncomeData = req.body;
    const userData = req.user;
    console.log(userData);
    const newIncome = await Income.create({
      ...IncomeData,
      userId: userData.id,
    });
    res.status(201).send({ status: true, incomeData: newIncome });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};
export const getAllIncomes = async (req, res) => {
  try {
    const userData = req.user;
    const Incomes = await Income.find({ userId: userData.id });
    res.status(200).send({ status: true, incomesData: Incomes });
  } catch (err) {
    res.status(401).json({
      staus: false,
      message: err.message,
    });
  }
};
export const getIncomeById = async (req, res) => {
  try {
    const jwtToken = req.headers["jwttoken"];
    const userData = await jwt.verify(jwtToken, process.env.JWT_SECRET_SALT);
    const IncomeId = req.params.IncomeId;
    const IncomeData = await Income.findById(IncomeId);
    if (IncomeData.userId !== userData.id) {
      return res.status(401).send("Unauthorized");
    }
    return res.status(200).send(IncomeData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const updateIncomeByid = async (req, res) => {
  try {
    const newIncomeData = Income.updateOne(req.params.IncomeId, req.body);
    res.status(200).send(newIncomeData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const deleteIncomeById = async (req, res) => {
  try {
    console.log(req.params);
    await Income.findByIdAndDelete(req.params.IncomeId);
    res
      .status(200)
      .send({ status: true, message: "Income Record deleted Successfully" });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};
