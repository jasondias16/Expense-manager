import Error from "./components/Error";
import "./App.css";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import UserIdState from "./context/userId/UserIdState";
import MonthlyBudgetState from "./context/monthlyBudget/MonthlyBudgetState";

//export const userID = React.createContext();
function App() {
  // return <LandingPage />;
  // <Home />;

  return (
    <UserIdState>
      <MonthlyBudgetState>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="expense-manager" element={<Home />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MonthlyBudgetState>
    </UserIdState>
  );
}

export default App;
