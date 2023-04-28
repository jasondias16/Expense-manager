import React from "react";
import ViewMonthlyBudget from "./ViewMonthlyBudget";
import AddMonthlyBudget from "./AddMonthlyBudget";
import "../styles/MonthlyBudget.css";
function MonthlyBudget() {
  console.log("monthly budget was renderd");
  return (
    <div className="monthly-budget">
      <ViewMonthlyBudget />
      {/* <AddMonthlyBudget /> */}
    </div>
  );
}

export default MonthlyBudget;
