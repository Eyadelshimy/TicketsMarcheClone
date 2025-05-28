import React, { useState } from "react";
import "../assets/css/bookingModal.css";
import BookingModalBS from "../Components/BookingModalBS";

const BookingModal = ({ event, isOpen, onClose, onBook }) => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    specialRequests: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Review

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bookingData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!bookingData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!bookingData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (bookingData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
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
      // Call the onBook callback with booking data
      onBook({
        ...bookingData,
        eventId: event._id,
        eventTitle: event.title,
        totalPrice: calculateTotalPrice(),
        bookingDate: new Date().toISOString(),
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setBookingData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          specialRequests: "",
        });
        setStep(1);
      }, 2000);
    } catch (error) {
      console.error("Booking failed:", error);
      setErrors({ submit: "Booking failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const priceValue = event.ticketPricing;
    return priceValue * bookingData.quantity;
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <BookingModalBS
      show={isOpen}
      onClose={onClose}
      event={event}
      step={step}
      isSuccess={isSuccess}
      isLoading={isLoading}
      bookingData={bookingData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      calculateTotalPrice={calculateTotalPrice}
    />
  );
};

export default BookingModal;
