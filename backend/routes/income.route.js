import express from "express";
import {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncomeByid,
  deleteIncomeById,
} from "../controllers/income.controller.js";
import { AuthMddleware } from "../middleware/auth.middleware.js";
import { isAdminOrSameUserMiddleware } from "../middleware/isAdminOrSameUser.midddleware.js";
const routes = express.Router();
//add income
routes.post("/", AuthMddleware, createIncome);
//get all incomes
routes.get("/", AuthMddleware, getAllIncomes);
//get income by id
routes.get(
  "/:IncomeId",
  AuthMddleware,
  isAdminOrSameUserMiddleware,
  getIncomeById
);
//update income by id
routes.put("/:IncomeId", AuthMddleware, updateIncomeByid);
// delete income by id
routes.delete("/:IncomeId", AuthMddleware, deleteIncomeById);
export default routes;
