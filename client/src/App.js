import Error from "./components/Error";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import UserIdState from "./context/userId/UserIdState";
import MonthlyBudgetState from "./context/monthlyBudget/MonthlyBudgetState";
import SharedLayout from "./components/SharedLayout";
import Input from "./pages/Input";
import AddMonthlyBudget from "./pages/AddMonthlyBudget";
import ViewMonthlyBudget from "./pages/ViewMonthlyBudget";
import DisplayExpenses from "./pages/DisplayExpenses";

function App() {
  return (
    <UserIdState>
      <MonthlyBudgetState>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="expense" element={<SharedLayout />}>
                <Route path="view-expense" element={<DisplayExpenses />} />
                <Route path="add-expense" element={<Input />} />
                <Route
                  path="add-monthly-budget"
                  element={<AddMonthlyBudget />}
                />
                <Route
                  path="view-monthly-budget"
                  element={<ViewMonthlyBudget />}
                />
              </Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MonthlyBudgetState>
    </UserIdState>
  );
}

export default App;
