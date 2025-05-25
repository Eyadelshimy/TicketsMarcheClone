import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { events as eventsConnection } from "../../Connections/axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Define status badge colors
  const statusColors = {
    Approved: "success",
    Pending: "warning",
    Declined: "danger",
  };

  useEffect(() => {
    if (user?._id !== undefined) fetchMyEvents();
  }, [user]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsConnection.get(`/organizer/${user._id}`);

      const data = await response.data;
      setEvents(data.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load your events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventsConnection.delete(`/${eventId}`);

        // Remove the deleted event from state
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId),
        );
      } catch (err) {
        console.error("Error deleting event:", err);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <h1>My Events</h1>
        <Link to="/create-event" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Create New Event
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && events.length === 0 && (
        <div className="alert alert-info">
          <p className="mb-0">You haven't created any events yet.</p>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {events.map((event) => (
          <div className="col" key={event._id}>
            <div className="card h-100 shadow-sm">
              <div
                className={`card-status-badge badge mb-2 bg-${statusColors[event.status]}`}
              >
                {event.status}
              </div>

              {event.image && (
                <img
                  src={event.image}
                  className="card-img-top"
                  alt={event.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted mb-1">
                  <small>
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {event.location}
                  </small>
                </p>
                <p className="card-text text-muted mb-2">
                  <small>
                    <i className="far fa-calendar-alt me-1"></i>
                    {formatDate(event.date)}
                  </small>
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="badge bg-light text-dark">
                    Tickets: {event.remainingTickets}/{event.totalTickets}
                  </span>
                  <span className="fw-bold">${event.ticketPricing}</span>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="btn btn-outline-primary btn-sm"
                    disabled={event.status === "Approved"}
                  >
                    <i className="fas fa-edit me-1"></i>Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="fas fa-trash-alt me-1"></i>Delete
                  </button>
                </div>

                {event.status === "Approved" && (
                  <Link
                    to={`/event-dashboard/${event._id}`}
                    className="btn btn-outline-success btn-sm w-100 mt-2"
                  >
                    <i className="fas fa-chart-line me-1"></i>View Dashboard
                  </Link>
                )}
                {event.status === "Declined" && (
                  <div className="mt-2 small text-danger">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    Your event was declined. Please check your email for
                    details.
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
