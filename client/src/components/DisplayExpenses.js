import React, { useState } from "react";
import "../styles/DisplayExpenses.css";
import DisplayMonthlyExpenses from "./DisplayMonthlyExpenses";
import DisplayWeeklyExpenses from "./DisplayWeeklyExpenses";

function DisplayExpenses() {
  const [expensesShown, setExpensesShown] = useState(
    <DisplayMonthlyExpenses />
  );

  const setWeekly = () => {
    setExpensesShown(<DisplayWeeklyExpenses />);
  };

  const setMonthly = () => {
    setExpensesShown(<DisplayMonthlyExpenses />);
  };

  return (
    <div className="container mt-4 mb-">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary" onClick={setWeekly}>
          Weekly
        </button>

        <button type="button" className="btn btn-primary" onClick={setMonthly}>
          Monthly
        </button>
      </div>

      {expensesShown}
    </div>
  );
}

export default DisplayExpenses;
