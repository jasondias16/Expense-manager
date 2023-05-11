import React, { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function SharedLayout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default SharedLayout;
