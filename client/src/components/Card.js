import React from "react";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

function Card(props) {
  const id = useContext(userIdContext);
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

          <span id="amount" className="card-title">
            delete btn
          </span>
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
        <p>{id.userId}</p>
      </div>
    </div>
  );
}

export default Card;
