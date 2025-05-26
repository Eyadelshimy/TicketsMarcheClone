import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import EventCard from "../Components/EventCard";
import VenueCard from "../Components/VenueCard";
import CategoryCard from "../Components/CategoryCard";
import HotEventCard from "../Components/HotEventCard";

// Placeholder image URLs - replace with actual images later
const placeholderImage = "https://placehold.co/600x400?text=Event+Image";
// const organizerLogo = "https://placehold.co/150x50?text=Organizer";

const HomePage = () => {
  // Featured event state
  const [featuredEvent] = useState({
    title: "Disco Misr Festival",
    slug: "disco-misr-festival",
    image: placeholderImage,
    location: "Zed Park",
    date: "May 30",
    description: "A day-long festival featuring Disco Misr and other top DJs.",
  });

  // Sample data
  const categories = [
    { title: "Nightlife", count: 2, image: placeholderImage },
    { title: "Concerts", count: 8, image: placeholderImage },
    { title: "Comedy", count: 1, image: placeholderImage },
    { title: "Festival", count: 1, image: placeholderImage },
  ];

  const venues = [
    { title: "Boom Room, Open Air Mall, Madinaty", image: placeholderImage },
    { title: "Drama Hall", image: placeholderImage },
    { title: "El Rihany Theater", image: placeholderImage },
    { title: "Jesuit Cairo", image: placeholderImage },
  ];

  const hotEvents = [
    {
      title: "Stand Up Comedy",
      image: placeholderImage,
      location: "Cairo",
      date: "May 28, 2023",
    },
    {
      title: "Adam Port Live",
      image: placeholderImage,
      location: "New Capital",
      date: "May 30, 2023",
    },
    {
      title: "Diana Karazon",
      image: placeholderImage,
      location: "Cairo",
      date: "June 3, 2023",
    },
    {
      title: "Jeff Dunham",
      image: placeholderImage,
      location: "Cairo",
      date: "June 10, 2023",
    },
  ];

  const upcomingEvents = [
    {
      title: "Empower Her Art Forum",
      image: placeholderImage,
      location: "Cairo",
      date: "June 15, 2023",
    },
    {
      title: "Layaly Dalida",
      image: placeholderImage,
      location: "Alexandria",
      date: "June 18, 2023",
    },
    {
      title: "Tetrat W Zekrayat",
      image: placeholderImage,
      location: "Cairo",
      date: "June 25, 2023",
    },
  ];

  return (
    <div className="home-container">
      {/* Featured Event Section */}
      <div className="featured-event-wrapper">
        <div className="featured-event">
          <div className="splide__slide">
            <div className="event_details">
              <h2>{featuredEvent.title}</h2>
              <div className="event-date">
                {featuredEvent.date} <span className="date-separator">|</span> 9:00 PM
              </div>
              <div className="event-location">
                <strong>The Green River-New Capital</strong>
              </div>

              <div className="event-organizer">
                <div className="organizer-text">Organized by Other</div>
              </div>
              
              <div className="button-container">
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="btn btn-tm-primary flex-fill"
                >
                  <FaTicketAlt className="me-2" /> Book Now
                </Link>
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="btn btn-tm-link more-info flex-fill"
                >
                  More Info
                </Link>
              </div>
            </div>
            <img
              src={placeholderImage}
              alt={featuredEvent.title}
              className="event-image"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="content-wrapper">
        <section className="categories-section home-section-mt">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2>Explore Top Categories For Fun Things To Do</h2>
            <div className="carousel-navigation">
              <button className="carousel-prev" aria-label="Previous">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="carousel-next" aria-label="Next">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="category-carousel">
            <div className="categories-grid">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Venues Section */}
        <section className="venues-section home-section-mt">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2>Venues</h2>
            <div className="carousel-navigation">
              <button className="carousel-prev" aria-label="Previous">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="carousel-next" aria-label="Next">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="venues-carousel">
            <div className="venues-grid">
              {venues.map((venue, index) => (
                <VenueCard key={index} {...venue} />
              ))}
            </div>
          </div>
        </section>

        {/* Hot Events Section - Now with image-only design */}
        <section className="hot-events-section home-section-mt">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2>Hot Events</h2>
            <div className="carousel-navigation">
              <button className="carousel-prev" aria-label="Previous">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="carousel-next" aria-label="Next">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="events-carousel">
            <div className="events-grid">
              {hotEvents.map((event, index) => (
                <HotEventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="upcoming-events-section home-section-mt home-section-mb">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2>Upcoming Events</h2>
            <div className="carousel-navigation">
              <button className="carousel-prev" aria-label="Previous">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="carousel-next" aria-label="Next">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="events-carousel">
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>

          <div className="view-all-events">
            <Link to="/events" className="btn all-events-btn">
              Show All Events <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
