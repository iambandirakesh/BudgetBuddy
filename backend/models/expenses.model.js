import { Schema, model } from "mongoose";
const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    maxLength: [256, "Max of 256 characters allowed."],
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Expense = model("Expense", expenseSchema);
export default Expense;
