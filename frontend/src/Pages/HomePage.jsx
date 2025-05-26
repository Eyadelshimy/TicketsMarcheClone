import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { events } from "../Connections/axios";
import { Link } from "react-router-dom";

import HorizontalScroller from "../Components/HorizontalScrollWrapper";
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

      setFeaturedEvent(priceSortedEvents[0]);

      let categoriesF = [];
      let cI = 0;
      categories.forEach((categoryDesc) => {
        let count = 0;
        response.data.data.forEach((event) => {
          if (event.category === categoryDesc.title) count++;
        });

        let modCategoryDesc = categories[cI];
        modCategoryDesc.count = count;

        categoriesF.push(modCategoryDesc);

        count = 0;
        cI++;
      });

      setCategories(categoriesF);

      var hotdEvents = response.data.data.sort(
        (a, b) =>
          a.remainingTickets / a.totalTickets -
          b.remainingTickets / b.totalTickets,
      );

      hotdEvents = hotdEvents.filter((ev) => ev.remainingTickets != 0);

      let hotfEvents = [];
      hotdEvents.forEach((ev) => {
        let hotfEvent = {
          title: ev.title,
          image: ev.image,
          location: ev.location,
          date: ev.date,
        };

        hotfEvents.push(hotfEvent);
      });

      hotfEvents = hotfEvents.slice(0, 7);

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

      <HorizontalScroller
        title={"Explore Top Categories For Fun Things To Do"}
        items={categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      />
      <HorizontalScroller
        title={"Hot Events"}
        items={hotEvents.map((event, index) => (
          <HotEventCard
            key={index}
            title={event.title}
            image={event.image}
            date={event.date}
          />
        ))}
      />

      <HorizontalScroller
        title={"Upcoming Events"}
        items={upcomingEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      />

      <div className="view-all-events mx-8">
        <Link to="/events" className="btn all-events-btn">
          Show All Events <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
