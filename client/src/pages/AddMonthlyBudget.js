import React, { useState, useContext } from "react";
import "../styles/AddMonthlyBudget.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMonthlyBudget() {
  const url = "http://localhost:3001/set-monthly-budget";
  const id = useContext(userIdContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("values from handleSubmit function: ", values);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    Axios.post(url, {
      date: today,
      category: values.category,
      amount: values.amount,
      userId: id.userId,
    }).then((res) => {
      console.log("res.data: " + res.data);
    });

    // Notify the user the user
    toast.success("Monthly Budget added", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // navigate to the view expense budget page

    setTimeout(() => {
      navigate("/expense/view-monthly-budget");
    }, 2000);
  };
  return (
    <>
      <form className="container w-25 mt-5 mb-5" onSubmit={handleSubmit}>
        <h4>Add Category</h4>

        <div className="form-outline mb-4 formInput ">
          <label className="form-label" htmlFor="category">
            Category:
          </label>
          <input
            id="category"
            type="text"
            required
            name="category"
            value={values.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-outline mb-4 formInput  ">
          <label className="form-label" htmlFor="amount">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            required
            name="amount"
            min={0}
            value={values.amount}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          style={{ margin: "0% 50%" }}
        >
          Submit
        </button>
      </form>

      {/* toast container for the react toastify message */}
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

export default AddMonthlyBudget;
