import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        image: '',
        ticketPricing: '',
        totalTickets: '',
    });

    const [imagePreview, setImagePreview] = useState(null);
    
    const categories = [
        'Concert', 'Sports', 'Theater', 'Conference', 
        'Exhibition', 'Festival', 'Workshop', 'Other'
    ];
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            // For actual upload, we'll use FormData when submitting
            setEventData(prev => ({
                ...prev,
                imageFile: file
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            // Validate required fields
            const requiredFields = ['title', 'description', 'date', 'location', 'category', 'ticketPricing', 'totalTickets'];
            const missingFields = requiredFields.filter(field => !eventData[field]);
            
            if (missingFields.length > 0 || !eventData.imageFile) {
                throw new Error(`Please fill all required fields: ${missingFields.join(', ')}${!eventData.imageFile ? ', event image' : ''}`);
            }
            
            // Create form data for file upload
            const formData = new FormData();
            Object.keys(eventData).forEach(key => {
                if (key === 'imageFile') {
                    formData.append('image', eventData.imageFile);
                } else {
                    formData.append(key, eventData[key]);
                }
            });
            
            // Add organizer ID
            formData.append('organizer', user._id);
            // Initial status is Pending for admin approval
            formData.append('status', 'Pending');
            // Remaining tickets equals total tickets initially
            formData.append('remainingTickets', eventData.totalTickets);
            
            const response = await fetch('http://localhost:5000/api/v1/events', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to create event');
            }
            
            setSuccess('Event created successfully! It will be reviewed by an admin.');
            setTimeout(() => {
                navigate('/my-events');
            }, 2000);
            
        } catch (err) {
            setError(err.message);
            console.error('Error creating event:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Create New Event</h1>
                <Link to="/my-events" className="btn btn-secondary">Back to My Events</Link>
            </div>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}
            
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Event Title *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter event title" 
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Category *</label>
                                <select 
                                    className="form-select" 
                                    name="category"
                                    value={eventData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Description *</label>
                            <textarea 
                                className="form-control" 
                                rows="4" 
                                placeholder="Describe your event" 
                                name="description"
                                value={eventData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Date and Time *</label>
                                <input 
                                    type="datetime-local" 
                                    className="form-control" 
                                    name="date"
                                    value={eventData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Location *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter event location" 
                                    name="location"
                                    value={eventData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Ticket Price ($) *</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Enter ticket price" 
                                    name="ticketPricing"
                                    value={eventData.ticketPricing}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Total Tickets Available *</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Enter total number of tickets" 
                                    name="totalTickets"
                                    value={eventData.totalTickets}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="form-label">Event Image *</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Event preview" 
                                        className="img-thumbnail" 
                                        style={{ maxHeight: '200px' }} 
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="alert alert-info">
                            <small>
                                <i className="fa fa-info-circle me-1"></i>
                                Your event will be reviewed by admins before being published on the platform.
                            </small>
                        </div>
                        
                        <div className="text-end">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent; 