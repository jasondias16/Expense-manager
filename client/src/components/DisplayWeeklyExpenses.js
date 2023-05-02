import React, { useEffect, useState } from "react";
import Card from "./Card";
import Axios from "axios";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function DisplayWeeklyExpenses() {
  const id = useContext(userIdContext);
  const url = "http://localhost:3001/getWeeklyexpense";

  const [expenses, setExpenses] = useState([]);
  useEffect(
    () =>
      async function fetchdata() {
        Axios.post(url, { userId: id.userId })
          .then((res) => res.data)
          .then((expenses) => setExpenses(expenses));
        // .then((expenses) =>  );
      },
    []
  );

  return (
    <div id="showexpenses" className="mt-4 mb-4">
      {expenses.map((expense) => (
        <Card
          key={expense._id}
          category={expense.category}
          id={expense._id}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </div>
  );
}

export default DisplayWeeklyExpenses;
