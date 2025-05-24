import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaEye, FaSearch } from "react-icons/fa";
import "../../assets/css/admin.css";
import { events as eventsConnection } from "../../Connections/axios";
import EventDescriptionModal from "../../Components/EventDecriptionModal";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsConnection.get("/all");

      const data = response.data;
      setEvents(data.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      const response = eventsConnection.put(`/${eventId}`, {
        status: newStatus,
      });

      // Update the event in state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, status: newStatus } : event,
        ),
      );
    } catch (err) {
      console.error("Error updating event status:", err);
      alert("Failed to update event status. Please try again.");
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsViewingDetails(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      event.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Count events by status
  const eventCounts = events.reduce((counts, event) => {
    const status = event.status?.toLowerCase() || "unknown";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

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
        <h1>Event Management</h1>
        <div>
          <Link to="/admin/users" className="btn btn-outline-secondary me-2">
            User Management
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Total Events</h5>
              <h2 className="card-text">{events.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2 className="card-text">{eventCounts.pending || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <h2 className="card-text">{eventCounts.approved || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Declined</h5>
              <h2 className="card-text">{eventCounts.declined || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Tickets</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr key={event._id}>
                      <td>{event._id.slice(-6)}</td>
                      <td>{event.title}</td>
                      <td>{event.organizer}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.location}</td>
                      <td>
                        {event.remainingTickets}/{event.totalTickets}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            event.status.toLowerCase() === "approved"
                              ? "bg-success"
                              : event.status.toLowerCase() === "pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-info me-1"
                          onClick={() => handleViewDetails(event)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {event.status.toLowerCase() === "pending" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-success me-1"
                              onClick={() =>
                                handleStatusChange(event._id, "Approved")
                              }
                              title="Approve Event"
                            >
                              <FaCheck />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleStatusChange(event._id, "Declined")
                              }
                              title="Decline Event"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No events found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {isViewingDetails && selectedEvent && (
        <EventDescriptionModal
          show={isViewingDetails}
          handleClose={() => setIsViewingDetails(false)}
          image={selectedEvent.image}
          title={selectedEvent.title}
          description={selectedEvent.description}
        />
      )}
    </div>
  );
};

export default EventManagement;
