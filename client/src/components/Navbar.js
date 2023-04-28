import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <p className="navbar-brand">Expense Management</p>
      <form className="form-inline">
        <button className="btn btn-outline-success my-2 my-sm-0 ">
          User Profile
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
