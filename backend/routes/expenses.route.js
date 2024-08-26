import express from "express";
import {
  createexpense,
  getAllexpenses,
  getexpenseById,
  updateexpenseByid,
  deleteexpenseById,
} from "../controllers/expense.controller.js";
import { AuthMddleware } from "../middleware/auth.middleware.js";
const routes = express.Router();
//add expense
routes.post("/", AuthMddleware, createexpense);
//get all expenses
routes.get("/", AuthMddleware, getAllexpenses);
//get expense by id
routes.get("/:expenseId", AuthMddleware, getexpenseById);
//update expense by id
routes.put("/:expenseId", AuthMddleware, updateexpenseByid);
// delete expense by id
routes.delete("/:expenseId", AuthMddleware, deleteexpenseById);
export default routes;
