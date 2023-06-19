import React, { useState } from "react";
import { useContext } from "react";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card(props) {
  const id = useContext(userIdContext);

  const url = "http://localhost:3001/delete-expense";
  const handledelete = (expense_id, e) => {
    e.preventDefault();
    Axios.delete(url, {
      data: {
        expense_id: expense_id,
        userId: id.userId,
      },
    })
      .then((res) => res.body)
      .then(() => props.rerender())
      .then(() =>
        toast.success("Expense deleted successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Card;
