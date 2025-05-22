import { Link } from 'react-router-dom';

const placeholderImage = "https://via.placeholder.com/400x300?text=Venue+Image";

export default function VenueCard({ title, image }) {
  return (
    <div className="venue-card">
      <Link to={`/venues/${title.toLowerCase().replace(/\s+/g, '-')}`} className="venue-link">
        <div className="venue-image-container">
          <img
            src={image || placeholderImage}
            alt={title}
            className="venue_image"
          />
          <div className="venue-overlay">
            <h3 className="venue-title">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
