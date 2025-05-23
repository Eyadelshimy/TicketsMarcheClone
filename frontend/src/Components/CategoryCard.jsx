import { Link } from 'react-router-dom';

export default function CategoryCard({ title, count, image }) {
  const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';
  return (
    <div className="category-card">
      <Link to={`/events?category=${encodeURIComponent(title)}`} className="category-link">
        <div className="category-image-container">
          <img src={image || placeholderImage} alt={title} className="category-image" />
        </div>
        <div className="category_button">
          <div className="category_button_left">
            <span className="body-4-bold">{title}</span>
            <span className="body-7 count">{count} Events</span>
          </div>
          <div className="category_button_right">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </Link>
    </div>
  );
}
