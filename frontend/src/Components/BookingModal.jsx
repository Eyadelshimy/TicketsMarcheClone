import React, { useState } from 'react';
import '../assets/css/bookingModal.css';

const BookingModal = ({ event, isOpen, onClose, onBook }) => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Review

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (bookingData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateForm()) {
        setStep(2); // Move to review step
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call here
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onBook callback with booking data
      onBook({
        ...bookingData,
        eventId: event.id,
        eventTitle: event.title,
        totalPrice: calculateTotalPrice(),
        bookingDate: new Date().toISOString()
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setBookingData({
          name: '',
          email: '',
          phone: '',
          quantity: 1,
          specialRequests: ''
        });
        setStep(1);
      }, 2000);
      
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const priceValue = event.price === 'Free' ? 0 : parseFloat(event.price.replace(/[^0-9.]/g, ''));
    return priceValue * bookingData.quantity;
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        
        {isSuccess ? (
          <div className="booking-success">
            <i className="success-icon">✓</i>
            <h3>Booking Successful!</h3>
            <p>Your tickets for {event.title} have been booked.</p>
            <p>A confirmation has been sent to your email.</p>
          </div>
        ) : (
          <>
            <div className="booking-modal-header">
              <h2>{step === 1 ? 'Book Tickets' : 'Review Booking'}</h2>
              <h3>{event.title}</h3>
              <p>{event.date} at {event.time}</p>
              <p>{event.venue}, {event.location}</p>
              
              {step === 2 && (
                <div className="booking-steps">
                  <span className="step completed">Details</span>
                  <span className="step-separator">→</span>
                  <span className="step active">Review</span>
                </div>
              )}
            </div>
            
            {step === 1 ? (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="quantity">Number of Tickets</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={bookingData.quantity}
                    onChange={handleChange}
                    className={errors.quantity ? 'error' : ''}
                  />
                  {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests (Optional)</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="3"
                    value={bookingData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requirements or requests?"
                  ></textarea>
                </div>
                
                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Price per ticket:</span>
                    <span>{event.price}</span>
                  </div>
                  <div className="summary-item">
                    <span>Quantity:</span>
                    <span>{bookingData.quantity}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total:</span>
                    <span>
                      {event.price === 'Free' 
                        ? 'Free' 
                        : `${calculateTotalPrice()} ${event.price.replace(/[0-9.]/g, '').trim()}`}
                    </span>
                  </div>
                </div>
                
                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
                
                <button
                  type="submit"
                  className="book-tickets-btn"
                >
                  Continue to Review
                </button>
              </form>
            ) : (
              <div className="booking-review">
                <div className="review-section">
                  <h4>Event Details</h4>
                  <div className="review-item">
                    <span>Event:</span>
                    <span>{event.title}</span>
                  </div>
                  <div className="review-item">
                    <span>Date & Time:</span>
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="review-item">
                    <span>Venue:</span>
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
                
                <div className="review-section">
                  <h4>Customer Information</h4>
                  <div className="review-item">
                    <span>Name:</span>
                    <span>{bookingData.name}</span>
                  </div>
                  <div className="review-item">
                    <span>Email:</span>
                    <span>{bookingData.email}</span>
                  </div>
                  <div className="review-item">
                    <span>Phone:</span>
                    <span>{bookingData.phone}</span>
                  </div>
                  {bookingData.specialRequests && (
                    <div className="review-item">
                      <span>Special Requests:</span>
                      <span>{bookingData.specialRequests}</span>
                    </div>
                  )}
                </div>
                
                <div className="review-section">
                  <h4>Order Summary</h4>
                  <div className="review-item">
                    <span>Tickets:</span>
                    <span>{bookingData.quantity} x {event.price}</span>
                  </div>
                  <div className="review-item total">
                    <span>Total:</span>
                    <span>
                      {event.price === 'Free' 
                        ? 'Free' 
                        : `${calculateTotalPrice()} ${event.price.replace(/[0-9.]/g, '').trim()}`}
                    </span>
                  </div>
                </div>
                
                <div className="review-actions">
                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={handleBack}
                  >
                    Back to Details
                  </button>
                  <button
                    type="button"
                    className="book-tickets-btn"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal; 