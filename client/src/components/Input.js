import React, { useState, useRef, useEffect } from "react";
import "../styles/Input.css";
import Axios from "axios";
import DisplayExpenses from "./DisplayExpenses";
import MonthlyBudget from "../components/MonthlyBudget";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function Input() {
  const id = useContext(userIdContext);
  console.log("userid from input: ", id.userId);
  const url = "http://localhost:3001/setExpenseData";
  // const [expenseData, setExpenseData] = useState({
  //   date: "",
  //   category: "",
  //   amount: "",
  // });

  const dateRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();

  const [dropDownListItems, setDropDownListItems] = useState([
    "food",
    "entertainment",
    "grocires",
    "utilities",
    "bills",
    "fines",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateRef.current.value);
    console.log(categoryRef.current.value.trim());
    console.log(amountRef.current.value);

    Axios.post(url, {
      date: dateRef.current.value,
      category: categoryRef.current.value.trim(),
      amount: amountRef.current.value,
      id: id.userId,
    }).then((res) => {
      console.log(res.body);
    });
  };

  useEffect(() => {
    Axios.post("http://localhost:3001/getUC", {
      userId: id.userId,
    }).then((res) => res.data);
  });

  return (
    <>
      <MonthlyBudget />
      <form className="input-group" onSubmit={handleSubmit} method="POST">
        {/* Date */}
        <span className="input-group-text">Date</span>
        <input
          required
          type="date"
          className="form-control mydate"
          id="expdata"
          name="date"
          ref={dateRef}
        />

        {/* Category */}
        <span className="input-group-text">Category</span>
        <input
          required
          type="text"
          className="form-control"
          list="category_list"
          ref={categoryRef}
        />
        <datalist id="category_list">
          {dropDownListItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </datalist>

        {/* Amount */}
        <span className="input-group-text">Amount</span>
        <input
          type="number"
          name="amount"
          min={0}
          className="form-control"
          ref={amountRef}
          required
        />

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>

      {<DisplayExpenses />}
    </>
  );
}

export default Input;
