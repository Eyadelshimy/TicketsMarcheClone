// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Add other routes as needed */}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;