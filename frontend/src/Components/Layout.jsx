// src/Components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

