import React from "react";
import AddMonthlyBudget from "../pages/AddMonthlyBudget";
import "../styles/MonthlyBudget.css";
function MonthlyBudget() {
  // console.log("monthly budget was renderd");
  return (
    <div className="monthly-budget">
      <h2>Monthly Budget</h2>
      <AddMonthlyBudget />
    </div>
  );
}

export default MonthlyBudget;
