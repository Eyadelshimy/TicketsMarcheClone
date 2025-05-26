import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../assets/css/venueDetails.css";

const VenueDetailsPage = () => {
  const { venueSlug } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchVenueDetails = () => {
      // Mock data - in a real app, you would fetch this from an API
      const allVenues = [
        {
          id: 1,
          title: "Boom Room, Open Air Mall, Madinaty",
          image: "https://placehold.co/600x400?text=Venue+Image",
          location: "Madinaty, Cairo",
          description: "A premium venue for nightlife events and concerts in New Cairo.",
          facilities: ["Air conditioning", "Parking", "Accessible entrance", "Food & drinks"],
          capacity: "500 people",
          address: "Open Air Mall, Madinaty, Cairo",
          slug: "boom-room-open-air-mall-madinaty"
        },
        {
          id: 2,
          title: "Drama Hall",
          image: "https://placehold.co/600x400?text=Venue+Image",
          location: "Downtown Cairo",
          description: "A historic theater space perfect for dramatic performances and cultural events.",
          facilities: ["Seating", "Stage lighting", "Sound system", "Dressing rooms"],
          capacity: "300 people",
          address: "Downtown, Cairo",
          slug: "drama-hall"
        },
        {
          id: 3,
          title: "El Rihany Theater",
          image: "https://placehold.co/600x400?text=Venue+Image",
          location: "Central Cairo",
          description: "Named after the famous Egyptian comedian, this theater hosts comedy shows and cultural events.",
          facilities: ["Traditional seating", "Historic architecture", "Central location"],
          capacity: "450 people",
          address: "Emad El-Din Street, Cairo",
          slug: "el-rihany-theater"
        },
        {
          id: 4,
          title: "Jesuit Cairo",
          image: "https://placehold.co/600x400?text=Venue+Image",
          location: "Central Cairo",
          description: "A cultural center hosting various arts and cultural events in the heart of Cairo.",
          facilities: ["Multiple halls", "Exhibitions space", "Conference rooms"],
          capacity: "Varies by hall",
          address: "Ramses Street, Cairo",
          slug: "jesuit-cairo"
        }
      ];

      // Sample upcoming events at this venue
      const allEvents = [
        {
          id: 1,
          title: "Stand Up Comedy",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "May 28, 2023",
          category: "Comedy",
          venue: "Drama Hall",
          slug: "stand-up-comedy"
        },
        {
          id: 2,
          title: "Adam Port Live",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "New Capital",
          date: "May 30, 2023",
          category: "Nightlife",
          venue: "Boom Room, Open Air Mall, Madinaty",
          slug: "adam-port-live"
        },
        {
          id: 3,
          title: "Diana Karazon",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 3, 2023",
          category: "Concerts",
          venue: "El Rihany Theater",
          slug: "diana-karazon"
        },
        {
          id: 4,
          title: "Jeff Dunham",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 10, 2023",
          category: "Comedy",
          venue: "El Rihany Theater",
          slug: "jeff-dunham"
        }
      ];

      // Find venue by slug
      const foundVenue = allVenues.find(
        (venue) => venue.slug === venueSlug || 
                  venue.title.toLowerCase().replace(/\s+/g, "-") === venueSlug
      );

      if (foundVenue) {
        setVenue(foundVenue);
        
        // Find events at this venue
        const venueEvents = allEvents.filter(
          (event) => event.venue === foundVenue.title
        );
        setUpcomingEvents(venueEvents);
      } else {
        // Venue not found, redirect to home page
        navigate("/", { replace: true });
      }
      
      setLoading(false);
    };

    fetchVenueDetails();
  }, [venueSlug, navigate]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!venue) {
    return <div className="venue-not-found">Venue not found</div>;
  }

  return (
    <div className="venue-details-container">
      <div className="venue-details-header">
        <div className="venue-header-image" style={{ backgroundImage: `url(${venue.image})` }}>
          <div className="venue-header-overlay">
            <h1 className="venue-title">{venue.title}</h1>
            <p className="venue-location">{venue.location}</p>
          </div>
        </div>
      </div>

      <div className="venue-details-content">
        <div className="venue-main-content">
          <div className="venue-description-section">
            <h2>About This Venue</h2>
            <p>{venue.description}</p>
          </div>

          <div className="venue-facilities-section">
            <h2>Facilities</h2>
            <ul className="facilities-list">
              {venue.facilities.map((facility, index) => (
                <li key={index} className="facility-item">
                  <span className="facility-icon">✓</span>
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="venue-info-section">
            <h2>Venue Information</h2>
            <div className="venue-info-grid">
              <div className="venue-info-item">
                <span className="info-label">Capacity</span>
                <span className="info-value">{venue.capacity}</span>
              </div>
              <div className="venue-info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{venue.address}</span>
              </div>
            </div>
          </div>

          <div className="venue-location-section">
            <h2>Location</h2>
            <div className="venue-map-placeholder">
              <img 
                src={`https://placehold.co/800x400?text=Map+of+${encodeURIComponent(venue.title)}`} 
                alt={`Map of ${venue.title}`} 
                className="venue-map-image"
              />
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(venue.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-on-map-btn"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="venue-sidebar">
          <div className="upcoming-events-card">
            <h3>Upcoming Events at this Venue</h3>
            {upcomingEvents.length > 0 ? (
              <div className="venue-events-list">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="venue-event-item">
                    <img src={event.image} alt={event.title} className="event-thumbnail" />
                    <div className="event-info">
                      <h4 className="event-title">
                        <Link to={`/events/${event.slug}`}>{event.title}</Link>
                      </h4>
                      <p className="event-date">{event.date}</p>
                      <span className="event-category">{event.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events-message">No upcoming events at this venue.</p>
            )}
            
            <Link to="/events" className="view-all-events-btn">
              View All Events
            </Link>
          </div>

          <div className="contact-card">
            <h3>Contact</h3>
            <p>For bookings and inquiries:</p>
            <a href="mailto:info@ticketsmarche.com" className="contact-email">
              info@ticketsmarche.com
            </a>
            <a href="tel:+201234567890" className="contact-phone">
              +20 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage; 