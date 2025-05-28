import React from "react";
import { Modal, Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "../assets/css/bookingModal.css";

const BookingModal = ({
  show,
  onClose,
  event,
  step,
  bookingData,
  handleChange,
  handleSubmit,
  handleBack,
  errors,
  calculateTotalPrice,
  isLoading,
  isSuccess,
}) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  console.log(event);

  return (
    <div className="">
      <Modal show={show} onHide={onClose} centered className="">
        <button className="close-modal-btn" onClick={onClose}>
          <IoIosClose />
        </button>

        <Modal.Body>
          {isSuccess ? (
            <div className="booking-success">
              <i className="success-icon">V</i>
              <h3>Booking Successful!</h3>
              <p>Your tickets for {event.title} have been booked.</p>
              <p>A confirmation has been sent to your email.</p>
            </div>
          ) : (
            <>
              <div className="booking-modal-header">
                <h2>{step === 1 ? "Book Tickets" : "Review Booking"}</h2>
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleString("en-US", options)}</p>
                <p>{event.location}</p>

                {step === 2 && (
                  <div className="booking-steps">
                    <span className="step completed">Details</span>
                    <FaArrowRight />
                    <span className="step active">Review</span>
                  </div>
                )}
              </div>

              {step === 1 ? (
                <Form className="booking-form" onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <div className="error-message">{errors.phone}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="quantity">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      name="quantity"
                      value={bookingData.quantity}
                      onChange={handleChange}
                      className={errors.quantity ? "error" : ""}
                    />
                    {errors.quantity && (
                      <div className="error-message">{errors.quantity}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="specialRequests">
                    <Form.Label>Special Requests (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleChange}
                      placeholder="Any special requirements or requests?"
                    />
                  </Form.Group>

                  <Card className="booking-summary">
                    <Card.Body>
                      <div className="summary-item">
                        <span>Price per ticket:</span>
                        <span>
                          {event.ticketPricing == 0
                            ? "Free"
                            : event.ticketPricing}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span>Quantity:</span>
                        <span>{bookingData.quantity}</span>
                      </div>
                      <div className="summary-item total">
                        <span>Total:</span>
                        <span>{`${calculateTotalPrice()}`}</span>
                      </div>
                    </Card.Body>
                  </Card>

                  {errors.submit && (
                    <Alert variant="danger" className="submit-error">
                      {errors.submit}
                    </Alert>
                  )}

                  <Button type="submit" className="book-tickets-btn">
                    Continue to Review
                  </Button>
                </Form>
              ) : (
                <div className="booking-review">
                  <Card className="review-section">
                    <Card.Body>
                      <h4>Event Details</h4>
                      <div className="review-item">
                        <span>Event:</span>
                        <span>{event.title}</span>
                      </div>
                      <div className="review-item">
                        <span>Date & Time:</span>
                        <span>
                          {new Date(event.date).toLocaleString(
                            "en-US",
                            options,
                          )}
                        </span>
                      </div>
                      <div className="review-item">
                        <span>Location:</span>
                        <span>{event.location}</span>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="review-section">
                    <Card.Body>
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
                    </Card.Body>
                  </Card>

                  <Card className="review-section">
                    <Card.Body>
                      <h4>Order Summary</h4>
                      <div className="review-item">
                        <span>Tickets:</span>
                        <span>
                          {bookingData.quantity} x {event.ticketPricing}
                        </span>
                      </div>
                      <div className="review-item total">
                        <span>Total:</span>
                        <span>{`${calculateTotalPrice()}`}</span>
                      </div>
                    </Card.Body>
                  </Card>

                  <div className="review-actions">
                    <Button
                      variant="light"
                      className="back-btn"
                      onClick={handleBack}
                    >
                      Back to Details
                    </Button>
                    <button
                      className="book-tickets-btn"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingModal;
