import React, { useState, useRef } from "react";
import "../styles/DisplayExpenses.css";
import DisplayMonthlyExpenses from "../components/DisplayMonthlyExpenses";
import DisplayWeeklyExpenses from "../components/DisplayWeeklyExpenses";
import FilterByDate from "../components/FilterByDate";

function DisplayExpenses() {
  const [startdate, setStartDate] = useState("2020-01-01");
  const [enddate, setEndDate] = useState("2030-12-31");

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const [expensesShown, setExpensesShown] = useState(
    <DisplayMonthlyExpenses />
  );
  const handleFilter = (e) => {
    e.preventDefault();

    setExpensesShown(<FilterByDate startdate={startdate} enddate={enddate} />);
  };
  const setWeekly = () => {
    setExpensesShown(<DisplayWeeklyExpenses />);
  };

  const setMonthly = () => {
    setExpensesShown(<DisplayMonthlyExpenses />);
  };

  const maxDate = () => {
    return enddate;
  };
  const minDate = () => {
    return startdate;
  };
  return (
    <div className="container mt-4 mb-">
      <span className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary" onClick={setWeekly}>
          Weekly
        </button>

        <button type="button" className="btn btn-primary" onClick={setMonthly}>
          Monthly
        </button>
      </span>
      <form onSubmit={handleFilter} className="filterByDate">
        <span style={{ margin: "1% 1%" }}>
          start Date:
          <input
            type="date"
            required
            max={maxDate()}
            onChange={handleStartDate}
          />
        </span>

        <span>
          End Date:
          <input
            type="date"
            required
            onChange={handleEndDate}
            min={minDate()}
          />
        </span>
        <button type="submit">submit</button>
      </form>
      {expensesShown}
    </div>
  );
}

export default DisplayExpenses;
