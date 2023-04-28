import React, { useState } from "react";
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
  const [expenseData, setExpenseData] = useState({
    date: "",
    category1: "",
    amount: "",
  });

  const [dropDownListItems, setDropDownListItems] = useState([
    "Food",
    "Entertainment",
    "Grocires",
    "Utilities",
    "Bills",
    "Fines",
  ]);
  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(expenseData);

    Axios.post(url, {
      date: expenseData.date,
      category: expenseData.category1,
      amount: expenseData.amount,
      id: id.userId,
    }).then((res) => {
      console.log(res.body);
    });
  };

  return (
    <>
      <MonthlyBudget />
      <form className="input-group" onSubmit={handleSubmit} method="POST">
        <span className="input-group-text">Date</span>
        <input
          required
          type="date"
          className="form-control mydate"
          id="expdata"
          name="date"
          value={expenseData.date}
          onChange={handleChange}
        />

        <span className="input-group-text">Category</span>
        {/* <input
          required
          type="text"
          name="category"
          className="form-control"
          value={expenseData.categry}
          onChange={handleChange}
        /> */}
        <input
          type="text"
          className="form-control"
          name="category1"
          list="category"
          value={expenseData.category}
          onChange={handleChange}
        />
        <datalist id="category">
          {dropDownListItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </datalist>

        <span className="input-group-text">Amount</span>
        <input
          type="number"
          name="amount"
          min={0}
          className="form-control"
          value={expenseData.amount}
          onChange={handleChange}
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
