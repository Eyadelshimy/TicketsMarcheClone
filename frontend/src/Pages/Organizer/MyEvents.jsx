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

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Events</h1>
        <Link
          to="/create-event"
          className="btn"
          style={{
            backgroundColor: "#f7c53f",
            color: "#212121",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <i className="fas fa-plus me-2"></i>Create New Event
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="alert alert-info">
          You haven't created any events yet. Start by creating your first event!
        </div>
      ) : (
        <div className="row g-4">
          {events.map((event) => (
            <div key={event._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "200px",
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className={`badge bg-${
                    statusColors[event.status]
                  } position-absolute top-0 end-0 m-2`}
                >
                  {event.status}
                </div>
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
                      className="btn"
                      style={{
                        backgroundColor: "#f7c53f",
                        color: "#212121",
                        fontWeight: "600",
                        flex: "1",
                        marginRight: "8px",
                      }}
                    >
                      <i className="fas fa-edit me-1"></i>Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="btn btn-outline-danger"
                      style={{ flex: "1" }}
                    >
                      <i className="fas fa-trash-alt me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
