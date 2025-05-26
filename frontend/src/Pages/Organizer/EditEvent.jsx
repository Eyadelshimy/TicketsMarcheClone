import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { events as eventsConnection } from "../../Connections/axios";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    image: "",
    ticketPricing: "",
    totalTickets: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Nightlife",
    "Concerts",
    "Art & Theatre",
    "Comedy",
    "Festival",
    "Activities",
    "Other",
  ];

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await eventsConnection.get(`/${eventId}`);
      // The response data is an array with one event, so we take the first item
      const event = response.data[0];
      
      if (!event) {
        throw new Error("Event not found");
      }
      
      setEventData({
        title: event.title,
        description: event.description,
        date: event.date.split('T')[0], // Format date for input
        location: event.location,
        category: event.category,
        image: event.image,
        ticketPricing: event.ticketPricing,
        totalTickets: event.totalTickets,
      });
      
      setImagePreview(event.image);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("Failed to load event details. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEventData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await eventsConnection.put(`/${eventId}`, eventData);
      
      if (response.data.success) {
        setSuccess("Event updated successfully!");
        setTimeout(() => {
          navigate("/my-events");
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating event:", err);
      setError(err.response?.data?.message || "Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
        <h1>Edit Event</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter event title"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Describe your event"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date and Time *</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Ticket Price *</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                    name="ticketPricing"
                    value={eventData.ticketPricing}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Total Tickets *</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter total tickets"
                  name="totalTickets"
                  value={eventData.totalTickets}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Event Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="mt-2"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              )}
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => navigate("/my-events")}
                className="btn btn-outline-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  flex: 1,
                  backgroundColor: "#f7c53f",
                  color: "#212121",
                  fontWeight: "600",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent; 