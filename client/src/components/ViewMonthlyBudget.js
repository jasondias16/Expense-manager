import React from "react";
import "../styles/ViewMonthlyBudget.css";
import AddMonthlyBudget from "./AddMonthlyBudget";
function ViewMonthlyBudget() {
  return (
    <div id="container">
      <h2>Monthly Budget</h2>
      <p className="mt-4"> Monthly budget will be shown here category wise</p>
      {<AddMonthlyBudget />}
    </div>
  );
}

export default ViewMonthlyBudget;
