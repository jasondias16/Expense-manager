import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import MonthlyBudget from "../components/MonthlyBudget";
import DisplayExpenses from "../components/DisplayExpenses";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* <MonthlyBudget /> */}
        <Input />
        {/* <DisplayExpenses /> */}
      </div>
    </>
  );
}

export default Home;
