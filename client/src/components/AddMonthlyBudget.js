import React, { useState, useContext } from "react";
import "../styles/AddMonthlyBudget.css";
import ViewMonthlyBudget from "./ViewMonthlyBudget";
import Axios from "axios";
import userIdContext from "../context/userId/UserIdContex";

function AddMonthlyBudget() {
  const url = "http://localhost:3001/setMonthlyBudget";
  const id = useContext(userIdContext);

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
  };
  return (
    <>
      <ViewMonthlyBudget />
      <button
        id="cont"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        + Add category
      </button>
      <form onSubmit={handleSubmit}>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Category</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <label>
                  category{" "}
                  <input
                    type="text"
                    required
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  amount{" "}
                  <input
                    type="number"
                    required
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddMonthlyBudget;
