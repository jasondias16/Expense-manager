import React, { useState } from "react";
import { useContext } from "react";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";

function Card(props) {
  const id = useContext(userIdContext);

  const url = "http://localhost:3001/delete-expense";
  const handledelete = (id, e) => {
    e.preventDefault();
    Axios.delete(url, {
      data: {
        cardId: id,
        userId: id.userId,
      },
    })
      .then((res) => res.body)
      //.then((response) => console.log(response))
      .then(() => props.rerender());
  };

  return (
    <div
      className="card mb-4"
      style={{ width: "18rem", backgroundColor: "#9dc6d8" }}
      key={props.id}
    >
      <div className="card-body">
        <div
          className="singleLine"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span id="category" style={{ fontWeight: "700" }}>
            {props.category}
          </span>

          <button
            style={{ fontSize: "10px" }}
            className="card-title"
            onClick={(e) => handledelete(props.id, e)}
          >
            delete
          </button>
        </div>

        <div
          className="singleLine"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {" "}
          <span id="amount" className="card-title">
            Amount: {props.amount}
          </span>
          <span
            id="date"
            className="card-title"
            style={{
              display: "inlineBlock",
              textAlign: "right",
            }}
          >
            {props.date.slice(0, 10).split("-").reverse().join("/")}
          </span>
        </div>
        {/* <p>{id.userId}</p> */}
      </div>
    </div>
  );
}

export default Card;
