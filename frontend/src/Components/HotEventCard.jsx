import { Link } from "react-router-dom";

export default function HotEventCard({ title, image, date, id }) {
  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="hot-event-card">
      <Link to={`/events/${id}`}>
        <div className="hot-event-image-container">
          <img
            src={image || placeholderImage}
            alt={title}
            className="event-card-image"
          />
          <div className="hot-event-overlay">
            <h3 className="event-title">{title}</h3>
            <p className="event-date">
              {new Date(date).toLocaleDateString("en-US", options)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
