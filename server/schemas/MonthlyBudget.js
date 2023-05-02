const mongoose = require("mongoose");

const MonthlyBudgetSchema = new mongoose.Schema({
  date: String,
  category: String,
  amount: Number,
  userID: String,
});

module.exports = mongoose.model("MonthlyBudget", MonthlyBudgetSchema);
