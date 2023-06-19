import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import userIdContext from "../context/userId/UserIdContex";

import "../styles/Navbar.css";

function Navbar() {
  const id = useContext(userIdContext);
  const navigate = useNavigate();
  // const userProfile = () => {
  //   navigate("/user-profile");
  // };

  const handleAddExpense = () => {
    navigate("add-expense");
  };

  const handleViewExpense = () => {
    navigate("view-expense");
  };
  const handleAddMonthlyBudget = () => {
    navigate("add-monthly-budget");
  };
  const handleViewMonthlyBudget = () => {
    navigate("view-monthly-budget");
  };

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar-light bg-light ">
        <div className="title">
          <span className="navbarBrand">Expense Management</span>
          <span className="userInfo">
            Welcome {id.userName}{" "}
            <button className="btn-danger logoutBtn" onClick={handleLogOut}>
              log Out
            </button>
          </span>
        </div>

        <div className="flex-container">
          <button
            type="button"
            className="btn-primary navbtn"
            onClick={handleAddExpense}
          >
            Add Expenses
          </button>
          <button
            type="button"
            className="btn-primary navbtn"
            onClick={handleViewExpense}
          >
            View Expenses
          </button>
          <button
            type="button"
            className=" btn-primary navbtn"
            onClick={handleAddMonthlyBudget}
          >
            Add Monthly Budget
          </button>
          <button
            type="button"
            className="btn-primary navbtn"
            onClick={handleViewMonthlyBudget}
          >
            View Monthly Budget
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
