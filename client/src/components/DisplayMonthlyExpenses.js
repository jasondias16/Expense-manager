import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import Axios from "axios";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function DisplayMonthlyExpenses() {
  const id = useContext(userIdContext);
  const url = "http://localhost:3001/getMonthlyexpense";

  const [expenses, setExpenses] = useState([]);
  //const expenses = useRef();

  useEffect(
    () =>
      async function fetchdata() {
        Axios.post(url, { userId: id.userId })
          .then((res) => res.data)
          .then((expenses) => setExpenses(expenses));
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

export default DisplayMonthlyExpenses;
