const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  date: Date,
  category: String,
  amount: Number,
  userID: String,
});

module.exports = mongoose.model("Expense", ExpenseSchema);
