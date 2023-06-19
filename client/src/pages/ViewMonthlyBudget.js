import React from "react";
import "../styles/ViewMonthlyBudget.css";
import { useContext, useState, useEffect } from "react";
import userIdContext from "../context/userId/UserIdContex";
import monthlyBudgetContext from "../context/monthlyBudget/MonthlyBudgetContext";
import Axios from "axios";
import MonthlyBudgetCard from "../components/MonthlyBudgetCard";

function ViewMonthlyBudget() {
  // context for user id
  const id = useContext(userIdContext);
  // context to store monthly budget in mb variable
  const mb = useContext(monthlyBudgetContext);
  const url = "http://localhost:3001/get-monthly-budget";

  const [monthlyBudget, setMonthlyBudget] = useState([]);
  async function fetchBudget() {
    Axios.get(url, { params: { userId: id.userId } })
      .then((res) => res.data)
      .then((monthlyBudget) => setMonthlyBudget(monthlyBudget));
    // .then((monthlyBudget) => mb.setMonthlyBudget(monthlyBudget));
  }

  const rerender = () => {
    console.log("to re render this list");
    fetchBudget();
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  //console.log("ViewMonthlyBudget was rendered");
  return (
    <div id="container" className="container">
      <span className="mt-4 monthlybudgetcard">
        {/* {console.log(monthlyBudget[0].userID)} */}
        {monthlyBudget.map((expense) => (
          <MonthlyBudgetCard
            key={expense._id}
            id={expense._id}
            category={expense.category}
            amount={expense.amount}
            balance={expense.balance}
            rerender={rerender}
          />
        ))}
      </span>
    </div>
  );
}

export default ViewMonthlyBudget;
