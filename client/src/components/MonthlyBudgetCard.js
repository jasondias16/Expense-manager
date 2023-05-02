import React from "react";
import { useContext } from "react";
import "../styles/MonthlyBudgetCard.css";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";

function MonthlyBudgetCard(props) {
  const id = useContext(userIdContext);
  const url = "http://localhost:3001/deletemonthlybudgetcard";
  const handledelete = (id, e) => {
    e.preventDefault();
    console.log("Monthly Budget card id: ", id);

    Axios.post(url, {
      cardId: id,
    }).then((res) => {
      console.log(res.body);
    });
  };
  return (
    <div
      className="card mb-3"
      style={{ width: "10rem", backgroundColor: "#ffffff" }}
      key={props.id}
    >
      <div className="card-body">
        <div
          className="singleLine"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span id="category" style={{ fontWeight: "500" }}>
            {props.category}
          </span>

          <button
            id="amount"
            style={{ fontSize: "10px" }}
            onClick={(e) => handledelete(props.id, e)}
          >
            del btn
          </button>
        </div>

        <div
          className="singleLine"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span id="amount" className="card-title">
            Amount: {props.amount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyBudgetCard;
