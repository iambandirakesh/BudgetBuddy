import express from "express";
import connectToDB from "./Database/db.js";
import UserRoutes from "./routes/user.route.js";
import ExpenseRoutes from "./routes/expenses.route.js";
import IncomeRoutes from "./routes/income.route.js";
import cors from "cors";
const app = express();
app.use(cors());
import dotenv from "dotenv";
dotenv.config();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.set("view engine", "ejs");
//routes
app.use("/api/user", UserRoutes);
app.use("/api/income", IncomeRoutes);
app.use("/api/expenses", ExpenseRoutes);
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectToDB();
});
