import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import Axios from "axios";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function DisplayMonthlyExpenses() {
  const id = useContext(userIdContext);
  const url = "http://localhost:3001/get-monthly-expense";

  const [expenses, setExpenses] = useState([]);

  async function fetchdata() {
    console.log("fetch data is called!!!");
    Axios.get(url, { params: { userId: id.userId } })
      .then((res) => res.data)
      .then((expenses) => setExpenses(expenses));
  }

  const rerender = () => {
    console.log("to re render this list");
    fetchdata();
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div id="showexpenses" className="mt-4 mb-4">
      {expenses.map((expense) => (
        <Card
          key={expense._id}
          category={expense.category}
          id={expense._id}
          amount={expense.amount}
          date={expense.date}
          rerender={rerender}
        />
      ))}
    </div>
  );
}

export default DisplayMonthlyExpenses;
