import React, { useState } from "react";
import "../styles/AddMonthlyBudget.css";
function AddMonthlyBudget() {
  const [values, setValues] = useState({
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    console.log("dddeddd");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <>
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
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  amount{" "}
                  <input
                    type="number"
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
