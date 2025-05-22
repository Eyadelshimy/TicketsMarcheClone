import { Link } from 'react-router-dom';

export default function EventCard({ title, image, location, date }) {
    const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

    // Safe slug generation
    const safeSlug = typeof title === 'string'
        ? title.toLowerCase().replace(/\s+/g, '-')
        : 'event';

    return (
        <div className="event-card">
            <Link to={`/events/${safeSlug}`} className="event-link">
                <div className="event-image-container">
                    <img src={image || placeholderImage} alt={title || 'Event'} className="event-card-image" />
                    <span className="event-label">{location}</span>
                </div>
                <div className="event-info">
                    <h3 className="event-title">{title || 'Untitled Event'}</h3>
                    <p className="event-date">{date}</p>
                </div>
            </Link>
        </div>
    );
}
