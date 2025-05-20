import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/v1/bookings/user/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            setBookings(data.data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to load your bookings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    // Function to generate a random color for booking card borders
    const getRandomColor = (eventName) => {
        // Generate a consistent color based on event name
        const colors = ['primary', 'success', 'info', 'warning', 'danger'];
        const hash = eventName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My Bookings</h1>
                <Link to="/" className="btn btn-primary">
                    <i className="fas fa-ticket-alt me-2"></i>Browse Events
                </Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && bookings.length === 0 && (
                <div className="alert alert-info">
                    <p className="mb-0">You don't have any bookings yet. Browse events and book your first ticket!</p>
                </div>
            )}

            {bookings.length > 0 && (
                <div className="row">
                    {bookings.map(booking => {
                        const colorClass = getRandomColor(booking.event?.title || 'Event');
                        return (
                            <div className="col-md-6 mb-4" key={booking._id}>
                                <div className={`card border-${colorClass} shadow-sm h-100`}>
                                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">{booking.event.title}</h5>
                                        <span className="badge bg-light text-dark">
                                            {booking.ticketQuantity} {booking.ticketQuantity > 1 ? 'tickets' : 'ticket'}
                                        </span>
                                    </div>
                                    
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <p className="card-text mb-1">
                                                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                                                {booking.event.location}
                                            </p>
                                            <p className="card-text mb-1">
                                                <i className="far fa-calendar-alt me-2 text-secondary"></i>
                                                {formatDate(booking.event.date)}
                                            </p>
                                            <p className="card-text">
                                                <i className="fas fa-tags me-2 text-secondary"></i>
                                                ${booking.event.ticketPricing} per ticket
                                            </p>
                                        </div>
                                        
                                        <div className="booking-details p-3 bg-light rounded mb-3">
                                            <p className="mb-1">
                                                <strong>Booking ID:</strong> {booking.bookingID}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Booked On:</strong> {formatDate(booking.createdAt)}
                                            </p>
                                            <p className="mb-0">
                                                <strong>Total Paid:</strong> ${(booking.ticketQuantity * booking.event.ticketPricing).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer bg-white d-flex justify-content-between">
                                        <button 
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => alert('Download functionality coming soon!')}
                                        >
                                            <i className="fas fa-download me-2"></i>Download Ticket
                                        </button>
                                        <Link 
                                            to={`/events/${booking.event._id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            <i className="fas fa-info-circle me-2"></i>Event Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookings; 