import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/eventDetails.css";
import BookingModal from "../Components/BookingModal";

import { bookings as bookingConnection } from "../Connections/axios";
import { events as eventsConnection } from "../Connections/axios";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    eventsConnection.get(`/${eventId}`).then((response) => {
      setEvent(response.data[0]);
    });

    if (event) setLoading(false);
  }, [eventId, navigate]);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingComplete = (bookingData) => {
    console.log("Booking completed:", bookingData);

    bookingConnection
      .post("/", {
        id: bookingData.eventId,
        numTickets: bookingData.quantity,
      })
      .then(() => {
        setBookingSuccess(true);
      });
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!event || !event.title) {
    return <div className="event-not-found">Event not found</div>;
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
              <i className="icon-calendar"></i>
              <span>{event.date}</span>
            </div>
            <div className="event-meta-item">
              <i className="icon-clock"></i>
              <span>{event.time}</span>
            </div>
            <div className="event-meta-item">
              <i className="icon-location"></i>
              <span>{event.location}</span>
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
            <p>
              {event.venue}, {event.location}
            </p>
            {/* Here you could add a map integration */}
          </div>

          <div className="event-organizer-section">
            <h2>Organizer</h2>
            <p>{event.organizer}</p>
          </div>
        </div>

        <div className="event-sidebar">
          <div className="ticket-price-card">
            <h3>Ticket Price</h3>
            <p className="ticket-price">{event.price}</p>
            <button className="book-ticket-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>

          <div className="share-event-card">
            <h3>Share This Event</h3>
            <div className="social-share-buttons">
              <button className="share-button facebook">Facebook</button>
              <button className="share-button twitter">Twitter</button>
              <button className="share-button whatsapp">WhatsApp</button>
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
