// src/Components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/layout.css";

function Layout() {
  return (
    <div className="app-container">
      <div className="radial-g-top" style={{ backgroundColor: "#f7c53f" }}></div>
      <Navbar />
      <main className="main-content" style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

