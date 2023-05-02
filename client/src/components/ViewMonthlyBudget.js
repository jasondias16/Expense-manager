import React from "react";
import "../styles/ViewMonthlyBudget.css";
import { useContext, useState, useEffect } from "react";
import userIdContext from "../context/userId/UserIdContex";
import monthlyBudgetContext from "../context/monthlyBudget/MonthlyBudgetContext";
import Axios from "axios";
import MonthlyBudgetCard from "./MonthlyBudgetCard";

function ViewMonthlyBudget() {
  // context for user id
  const id = useContext(userIdContext);
  // context to store monthly budget in mb variable
  const mb = useContext(monthlyBudgetContext);
  const url = "http://localhost:3001/getMonthlyBudget";

  const [monthlyBudget, setMonthlyBudget] = useState([]);

  useEffect(
    () =>
      async function fetchBudget() {
        Axios.post(url, { userId: id.userId })
          .then((res) => res.data)
          //.then((monthlyBudget) => setMonthlyBudget(monthlyBudget));
          .then((monthlyBudget) => mb.setMonthlyBudget(monthlyBudget));
      },
    []
  );

  //console.log("ViewMonthlyBudget was rendered");
  return (
    <div id="container">
      <span className="mt-4">
        {/* {console.log(monthlyBudget[0].userID)} */}
        {mb.monthlyBudget.map((expense) => (
          <MonthlyBudgetCard
            key={expense._id}
            id={expense._id}
            category={expense.category}
            amount={expense.amount}
          />
        ))}
      </span>
    </div>
  );
}

export default ViewMonthlyBudget;
