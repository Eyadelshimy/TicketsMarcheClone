import {Link} from 'react-router-dom';

export default function HotEventCard ({ title, image, date }) {
    const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

    return (
    <div className="hot-event-card">
        <Link to={`/events/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="hot-event-image-container">
                <img src={image || placeholderImage} alt={title} className="event-card-image" />
                <div className="hot-event-overlay">
                    <h3 className="event-title">{title}</h3>
                    <p className="event-date">{date}</p>
                </div>
            </div>
        </Link>
    </div>
    );
}
