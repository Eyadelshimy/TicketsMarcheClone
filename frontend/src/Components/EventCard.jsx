import { Link } from "react-router-dom";

export default function EventCard({ title, image, location, date }) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="event-card">
      <Link to={`/events/`} className="event-link">
        <div className="event-image-container">
          <img
            src={image}
            alt={title || "Event"}
            className="event-card-image"
          />
          <span className="event-label">{location}</span>
        </div>
        <div className="event-info">
          <h3 className="event-title">{title || "Untitled Event"}</h3>
          <p className="event-date">
            {new Date(date).toLocaleDateString("en-US", options)}
          </p>
        </div>
      </Link>
    </div>
  );
}
