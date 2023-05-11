import React, { useState } from "react";
import { useContext } from "react";
import "../styles/MonthlyBudgetCard.css";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";

function MonthlyBudgetCard(props) {
  const id = useContext(userIdContext);
  // const [card_id, setCard_id] = useState("");
  const url = "http://localhost:3001/delete-monthly-budget-card";
  const handledelete = (id, e) => {
    e.preventDefault();
    console.log("Monthly Budget card id: ", id);
    //  setCard_id(id);
    Axios.delete(url, {
      data: {
        cardId: id,
      },
    })
      .then((res) => res.body)
      // .then((response) => console.log(response));
      .then(() => props.rerender());
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

          {/* <button
            style={{ fontSize: "10px" }}
            onClick={(e) => handledelete(props.id, e)}
          >
            del btn
          </button> */}
          <i
            className="material-icons"
            onClick={(e) => handledelete(props.id, e)}
          >
            delete
          </i>
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
