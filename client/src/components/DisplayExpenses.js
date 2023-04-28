import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/DisplayExpenses.css";
import Card from "./Card";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function DisplayExpenses() {
  const id = useContext(userIdContext);
  const url = "http://localhost:3001/getexpense";

  const [expenses, setExpenses] = useState([]);

  useEffect(
    () =>
      async function fetchdata() {
        Axios.post(url, { userId: id.userId })
          .then((res) => res.data)
          .then((expenses) => setExpenses(expenses));
      }
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

export default DisplayExpenses;
