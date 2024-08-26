import { Schema, model } from "mongoose";
const incomeSchema = new Schema({
  amount: {
    //amount should not be negative
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    maxLength: [256, "max 256 characters are allowed."],
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Income = model("Income", incomeSchema);
export default Income;
