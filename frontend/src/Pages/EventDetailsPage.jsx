import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/eventDetails.css";
import BookingModal from "../Components/BookingModal";
import { events as eventsConnection } from "../Connections/axios";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsConnection.get(`/${eventId}`);
        
        if (!response.data.success) {
          setError(response.data.error || "Failed to load event details");
          return;
        }
        
        const eventData = response.data.data;
        if (!eventData) {
          setError("Event not found");
          return;
        }
        
        setEvent(eventData);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.response?.data?.error || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingComplete = (bookingData) => {
    console.log("Booking completed:", bookingData);
    setBookingSuccess(true);
    setIsBookingModalOpen(false);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Event</h4>
          <p>{error}</p>
          <hr />
          <button 
            className="btn btn-outline-danger"
            onClick={() => navigate("/events")}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">
          <h4 className="alert-heading">Event Not Found</h4>
          <p>The event you're looking for could not be found.</p>
          <hr />
          <button 
            className="btn btn-outline-warning"
            onClick={() => navigate("/events")}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      {bookingSuccess && (
        <div className="booking-success-banner">
          Booking successful! Check your email for confirmation.
          <button
            className="close-success-banner"
            onClick={() => setBookingSuccess(false)}
          >
            ×
          </button>
        </div>
      )}

      <div className="event-details-header">
        <div className="event-header-content">
          <span className="event-category-badge">{event.category}</span>
          <h1 className="event-title">{event.title}</h1>
          <div className="event-meta">
            <div className="event-meta-item">
              <i className="fas fa-calendar-alt"></i>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="event-meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{event.location}</span>
            </div>
            <div className="event-meta-item">
              <i className="fas fa-ticket-alt"></i>
              <span>
                {event.remainingTickets} tickets remaining
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="event-details-content">
        <div className="event-main-content">
          <div className="event-image-gallery">
            <img
              src={event.image}
              alt={event.title}
              className="event-main-image"
            />
          </div>

          <div className="event-description-section">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>

          <div className="event-venue-section">
            <h2>Venue</h2>
            <p>{event.location}</p>
          </div>
        </div>

        <div className="event-sidebar">
          <div className="ticket-price-card">
            <h3>Ticket Information</h3>
            <p className="ticket-price">${event.ticketPricing}</p>
            <div className="ticket-details mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Available Tickets:</span>
                <span>{event.remainingTickets}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total Tickets:</span>
                <span>{event.totalTickets}</span>
              </div>
            </div>
            <button 
              className="book-ticket-button" 
              onClick={handleBookNow}
              disabled={event.remainingTickets === 0}
            >
              {event.remainingTickets === 0 ? 'Sold Out' : 'Book Now'}
            </button>
          </div>

          <div className="share-event-card">
            <h3>Share This Event</h3>
            <div className="social-share-buttons">
              <button className="share-button facebook">
                <i className="fab fa-facebook-f me-2"></i>Facebook
              </button>
              <button className="share-button twitter">
                <i className="fab fa-twitter me-2"></i>Twitter
              </button>
              <button className="share-button whatsapp">
                <i className="fab fa-whatsapp me-2"></i>WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        event={event}
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        onBook={handleBookingComplete}
      />
    </div>
  );
};

export default EventDetailsPage;

