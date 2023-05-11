import React, { useState, useRef, useEffect } from "react";
import "../styles/Input.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Input() {
  const id = useContext(userIdContext);
  console.log("userid from input: ", id.userId);
  const url = "http://localhost:3001/set-expense-data";
  const navigate = useNavigate();

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
    "fuel",
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
    })
      .then((res) => res.data)
      .then((response) => {
        if (response === 0) {
          //  alert("Budget Exceeded");
          // Notify the user
          toast.warn("Budget Exceeded", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          // alert("Record Inserted");
          toast.success("Expense Added", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });

    //navigate to view the expense budget page

    setTimeout(() => {
      navigate("/expense/view-expense");
    }, 2000);
  };

  return (
    <>
      <form
        className="container w-25 mt-5"
        onSubmit={handleSubmit}
        method="POST"
      >
        {/* <!-- Date input --> */}
        <div className="form-outline mb-4 ">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            required
            name="date"
            ref={dateRef}
          />
        </div>

        {/* <!-- category input --> */}
        <div className="form-outline mb-4 ">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="form-control "
            required
            ref={categoryRef}
            list="category_list"
          />
          <datalist id="category_list">
            {dropDownListItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </div>

        <div className="form-outline mb-4 ">
          <label className="form-label" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="form-control"
            min={0}
            ref={amountRef}
            required
          />
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
          Add Expense
        </button>
      </form>
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
    </>
  );
}

export default Input;
