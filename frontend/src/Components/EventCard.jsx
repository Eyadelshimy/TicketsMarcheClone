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
// import { useState } from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { BsCalendarEvent, BsGeoAlt, BsTicket } from 'react-icons/bs';

// const EventCard = ({ event }) => {
//   const [expanded, setExpanded] = useState(false);

//   // Placeholder image URL (can also use a local image)
//   const placeholderImage = 'https://via.placeholder.com/300x200?text=Event+Image';

//   return (
//     <Card 
//       className="mb-4 shadow-sm hover-shadow" 
//       onClick={() => setExpanded(!expanded)}
//       style={{ 
//         cursor: 'pointer',
//         transition: 'transform 0.2s, box-shadow 0.2s',
//         minHeight: expanded ? '450px' : '350px'
//       }}
//     >
//       {/* Card Image with Placeholder Fallback */}
//       <Card.Img 
//         variant="top" 
//         src={event.image || placeholderImage} 
//         alt={event.title}
//         style={{ height: '180px', objectFit: 'cover' }}
//       />

//       <Card.Body className="d-flex flex-column">
//         <Card.Title className="text-truncate">{event.title}</Card.Title>
//         <Badge bg="secondary" className="mb-2 align-self-start">
//           {event.category}
//         </Badge>

//         {/* Always visible basic info */}
//         <div className="mt-auto">
//           <p className="mb-1 text-muted">
//             <BsCalendarEvent className="me-2" />
//             {new Date(event.date).toLocaleDateString()}
//           </p>
//           <p className="mb-1 text-muted">
//             <BsGeoAlt className="me-2" />
//             {event.venue}
//           </p>
//         </div>

//         {/* Expanded details */}
//         {expanded && (
//           <div className="mt-3">
//             <hr />
//             <Card.Text>{event.description}</Card.Text>
            
//             <div className="d-flex justify-content-between align-items-center mt-auto">
//               <h5 className="mb-0">
//                 <BsTicket className="me-2" />
//                 ${event.ticketPrice}
//               </h5>
//               <Button 
//                 variant="primary" 
//                 size="sm"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   // Your booking logic here
//                 }}
//               >
//                 Book Now
//               </Button>
//             </div>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };
