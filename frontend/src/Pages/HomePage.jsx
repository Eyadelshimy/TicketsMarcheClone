import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { events } from "../Connections/axios";
import { Link } from "react-router-dom";
import EventCard from "../Components/EventCard";
import CategoryCard from "../Components/CategoryCard";
import HotEventCard from "../Components/HotEventCard";

import "../assets/css/home.css";
import getCategoryImageSource from "../utils/categoryImages";

const HomePage = () => {
  const [eventsFetchSuccess, setEventsFetchSuccess] = useState(false);
  const [featuredEvent, setFeaturedEvent] = useState({});
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hotEvents, setHotEvents] = useState([]);
  const [_, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([
    { title: "Nightlife", count: 0, image: "" },
    { title: "Concerts", count: 0, image: "" },
    { title: "Comedy", count: 0, image: "" },
    { title: "Art & Theatre", count: 0, image: "" },
    { title: "Festival", count: 0, image: "" },
    { title: "Activities", count: 0, image: "" },
  ]);

  let cI = 0;
  categories.forEach((categoryDesc) => {
    categories[cI].image = getCategoryImageSource(categoryDesc.title);
    cI++;
  });

  useEffect(() => {
    events.get("/").then((response) => {
      if (response.data.success == true) setEventsFetchSuccess(true);

      const priceSortedEvents = [...response.data.data].sort(
        (a, b) => a.ticketPricing - b.ticketPricing,
      );

      console.log(response.data.data);

      setFeaturedEvent(priceSortedEvents[0]);

      let cI = 0;
      categories.forEach((categoryDesc) => {
        let count = 0;
        const categoriesMinusCurrent = categories.filter(
          (_, idx) => idx !== cI,
        );

        response.data.data.forEach((event) => {
          if (event.category === categoryDesc.title) count++;
        });

        let modCategoryDesc = categories[cI];
        modCategoryDesc.count = count;
        setCategories([...categoriesMinusCurrent, categoryDesc]);

        count = 0;
        cI++;
      });

      var hotdEvents = response.data.data.sort(
        (a, b) =>
          a.remainingTickets / a.totalTickets -
          b.remainingTickets / b.totalTickets,
      );

      hotdEvents = hotdEvents.filter((ev) => ev.remainingTickets != 0);

      let hotfEvents = [];
      hotdEvents.forEach((ev) => {
        let hotfEvent = {
          title: "",
          image: "",
          location: "",
          date: "",
        };

        Object.keys(hotfEvent).forEach((key) => (hotfEvent[key] = ev[key]));
      });

      setHotEvents(hotfEvents);

      let upcoming = response.data.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );

      upcoming = upcoming.filter((upcomingEv) => {
        const now = new Date();
        const target = new Date(upcomingEv.date);

        const start = new Date(now.setHours(0, 0, 0, 0)); // today at midnight
        const end = new Date(start);
        end.setDate(end.getDate() + 7);

        return target >= start && target <= end;
      });

      setUpcomingEvents(upcoming);
      setIsLoading(eventsFetchSuccess);
    });
  }, []);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="home-container">
      {/* Featured Event Section */}
      <div className="featured-event-wrapper">
        <div className="featured-event">
          <div className="splide__slide">
            <div className="event_details">
              <div>
                <h2>{featuredEvent.title}</h2>
                <p>{featuredEvent.description}</p>
                <p>
                  <strong>Location:</strong> {featuredEvent.location}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(featuredEvent.date).toLocaleDateString(
                    "en-US",
                    options,
                  )}
                </p>
              </div>

              <div className="button-container">
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="btn btn-tm-primary"
                >
                  <FaTicketAlt className="me-2" /> Book Now
                </Link>
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="btn btn-tm-link more-info"
                >
                  More Info
                </Link>
              </div>
            </div>
            <img
              src={featuredEvent.image}
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
