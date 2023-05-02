import React, { useState } from "react";
import monthlyBudgetContext from "./MonthlyBudgetContext";

const MonthlyBudgetState = (props) => {
  const [monthlyBudget, setMonthlyBudget] = useState([]);

  return (
    <monthlyBudgetContext.Provider value={{ monthlyBudget, setMonthlyBudget }}>
      {props.children}
    </monthlyBudgetContext.Provider>
  );
};

export default MonthlyBudgetState;
