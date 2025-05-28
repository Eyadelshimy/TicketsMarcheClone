// src/Components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../assets/css/rand.css";

function Layout() {
  return (
    <div className="app-container">
      <section className="miuau"></section>
      <Navbar />
      <main className="main-content mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
