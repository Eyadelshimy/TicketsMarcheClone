import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { events } from "../Connections/axios";
import Spinner from "react-bootstrap/Spinner";
import "../assets/css/events.css";

// Placeholder image URL - replace with actual images later
const placeholderImage = "https://placehold.co/600x400?text=Event+Image";

const EventCard = ({ title, image, location, date, category, id }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="event-card">
      <Link to={`/events/${id}`} className="event-link">
        <div className="event-image-container">
          <img
            src={image || placeholderImage}
            alt={title}
            className="event-card-image"
          />
          <span className="event-label">{location}</span>
        </div>
        <div className="event-info">
          <span className="event-category">{category}</span>
          <h3 className="event-title">{title}</h3>
          <p className="event-date">
            {new Date(date).toLocaleDateString("en-US", options)}
          </p>
        </div>
      </Link>
    </div>
  );
};

const EventsPage = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    events.get("/").then((response) => {
      if (response.data.success == true) setIsLoading(false);
      setAllEvents(response.data.data);
    });
  }, []);

  // const { eventId } = useParams();

  // State for filters
  const [filters, setFilters] = useState({
    search: location.state?.search || "",
    category: "",
    location: "",
  });

  // State for filtered events
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  // Get unique categories for filter dropdown
  const categories = [...new Set(allEvents.map((event) => event.category))];

  // Get unique locations for filter dropdown
  const locations = [...new Set(allEvents.map((event) => event.location))];

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter events based on filters
  useEffect(() => {
    let results = allEvents;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm) ||
          event.date.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.category) {
      results = results.filter((event) => event.category === filters.category);
    }

    if (filters.location) {
      results = results.filter((event) => event.location === filters.location);
    }

    setFilteredEvents(results);
  }, [filters]);

  if (isLoading) return <Spinner animation="border" />;

  return (
    <div className="events-page-container">
      <div className="events-header">
        <h1>
          {filters.category ? `${filters.category} Events` : "All Events"}
        </h1>
        <p>Find the best events in your area</p>
      </div>

      <div className="filters-container">
        <div className="filters-container">
          <div className="filter-item">
            <input
              type="text"
              name="search"
              placeholder="Search events..."
              value={filters.search}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-item">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="events-results">
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          ) : (
            <div className="no-events-found">
              <p>No events found matching your criteria.</p>
              <button
                onClick={() =>
                  setFilters({ search: "", category: "", location: "" })
                }
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
