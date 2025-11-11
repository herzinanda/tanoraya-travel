"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

type TourBookingFormProps = {
  basePrice: number;
};

const TourBookingForm = ({ basePrice }: TourBookingFormProps) => {
  const [ticketType, setTicketType] = useState('economy');
  const [persons, setPersons] = useState(1);
  const [date, setDate] = useState('');

  // Calculate total price - this is a simple example
  const totalPrice = useMemo(() => {
    let multiplier = 1;
    if (ticketType === 'business') multiplier = 1.5;
    if (ticketType === 'first') multiplier = 2;
    return basePrice * persons * multiplier;
  }, [basePrice, persons, ticketType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic
    console.log({ date, ticketType, persons, totalPrice });
  };

  return (
    <div className="activities-card">
      <div className="booking-form">
        <h3>Tour Booking</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>From</label>
            <input type="text" placeholder="Enter starting location" />
          </div>
          <div className="mb-3">
            <label>To</label>
            <input type="text" placeholder="Enter destination" />
          </div>
          <div className="mb-3">
            <label>Ticket Type</label>
            <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Number of Persons</label>
            <select value={persons} onChange={(e) => setPersons(Number(e.target.value))}>
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
              <option value="5">5+</option>
            </select>
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <label>Total Price</label>
            <span className="fw-bold text-black">${totalPrice.toFixed(0)}</span>
          </div>
          <button type="submit" className="theme-btn">
            Book Now
            <Image src="/icon/white-arrow.svg" alt="arrow" width={12} height={12} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourBookingForm;