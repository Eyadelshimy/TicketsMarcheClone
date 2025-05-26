import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/eventDetails.css";
import BookingModal from "../Components/BookingModal";

const EventDetailsPage = () => {
  const { eventSlug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // In a real app, you would fetch event details from an API
  // For now, we'll use sample data
  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchEventDetails = () => {
      // Mock data - in a real app, you would fetch this from an API
      const allEvents = [
        {
          id: 1,
          title: "Stand Up Comedy",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "May 28, 2023",
          category: "Comedy",
          description: "Enjoy a night of laughter with the best stand-up comedians in town.",
          price: "200 EGP",
          time: "8:00 PM",
          venue: "Cairo Comedy Club",
          organizer: "Laugh Factory",
          slug: "stand-up-comedy"
        },
        {
          id: 2,
          title: "Adam Port Live",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "New Capital",
          date: "May 30, 2023",
          category: "Nightlife",
          description: "Experience the electrifying performance of Adam Port live.",
          price: "350 EGP",
          time: "10:00 PM",
          venue: "The Venue",
          organizer: "Party People",
          slug: "adam-port-live"
        },
        {
          id: 3,
          title: "Diana Karazon",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 3, 2023",
          category: "Concerts",
          description: "Join Diana Karazon for a night of beautiful music and amazing performance.",
          price: "300 EGP",
          time: "9:00 PM",
          venue: "Cairo Opera House",
          organizer: "Music Lovers",
          slug: "diana-karazon"
        },
        {
          id: 4,
          title: "Jeff Dunham",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 10, 2023",
          category: "Comedy",
          description: "Watch Jeff Dunham and his puppet friends in a hilarious comedy show.",
          price: "400 EGP",
          time: "8:30 PM",
          venue: "Cairo International Convention Centre",
          organizer: "Comedy Central",
          slug: "jeff-dunham"
        },
        {
          id: 5,
          title: "Empower Her Art Forum",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 15, 2023",
          category: "Festival",
          description: "A forum dedicated to empowering women in the arts.",
          price: "Free",
          time: "10:00 AM - 6:00 PM",
          venue: "Cairo Contemporary Art Center",
          organizer: "Women in Arts Foundation",
          slug: "empower-her-art-forum"
        },
        {
          id: 6,
          title: "Layaly Dalida",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Alexandria",
          date: "June 18, 2023",
          category: "Concerts",
          description: "A tribute concert to the legendary Dalida.",
          price: "250 EGP",
          time: "9:00 PM",
          venue: "Alexandria Opera House",
          organizer: "Musical Heritage",
          slug: "layaly-dalida"
        },
        {
          id: 7,
          title: "Tetrat W Zekrayat",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Cairo",
          date: "June 25, 2023",
          category: "Concerts",
          description: "A nostalgic journey through Egyptian music history.",
          price: "200 EGP",
          time: "8:00 PM",
          venue: "Cairo Cultural Center",
          organizer: "Egyptian Music Lovers",
          slug: "tetrat-w-zekrayat"
        },
        {
          id: 8,
          title: "Disco Misr Festival",
          image: "https://placehold.co/600x400?text=Event+Image",
          location: "Zed Park",
          date: "May 30, 2023",
          category: "Festival",
          description: "A day-long festival featuring Disco Misr and other top DJs.",
          price: "350 EGP",
          time: "2:00 PM - 2:00 AM",
          venue: "Zed Park",
          organizer: "Festival Hub",
          slug: "disco-misr-festival"
        }
      ];

      // Convert event slug from URL to match our data
      const foundEvent = allEvents.find(
        (event) => event.slug === eventSlug || 
                  event.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );

      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Event not found, redirect to events page
        navigate("/events", { replace: true });
      }
      
      setLoading(false);
    };

    fetchEventDetails();
  }, [eventSlug, navigate]);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingComplete = (bookingData) => {
    // In a real app, you would send this data to your backend
    console.log('Booking completed:', bookingData);
    setBookingSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!event) {
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
              <span>{event.location} - {event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="event-details-content">
        <div className="event-main-content">
          <div className="event-image-gallery">
            <img src={event.image} alt={event.title} className="event-main-image" />
          </div>
          
          <div className="event-description-section">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>

          <div className="event-venue-section">
            <h2>Venue</h2>
            <p>{event.venue}, {event.location}</p>
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
            <button 
              className="book-ticket-button"
              onClick={handleBookNow}
            >
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