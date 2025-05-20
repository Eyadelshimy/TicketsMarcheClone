// Components/Navbar.jsx
import React from 'react';
import '../assets/css/fonts.css';
import '../assets/css/buttons.css';
import '../assets/css/navbar.css';
import Logo from '../assets/svg/TicketsMarche.svg';

export default function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="tm-navbar">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <a className="navbar-brand" href="#">
                            <img src={Logo} alt="Logo" width="180" height="54" />
                        </a>
                    </div>

                    <div className="navbar-center">
                        <div className="search-container">
                            <input type="text" className="search-input" placeholder="Search..." />
                            <button className="search-button">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="9" cy="9" r="6" stroke="black" strokeWidth="1.5"/>
                                    <path d="M14 14L17 17" stroke="black" strokeWidth="1.5"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <a href="#" className="nav-link">Events</a>
                        <a href="#" className="nav-link profile-link">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18 20C18 17.7909 15.3137 16 12 16C8.68629 16 6 17.7909 6 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}