"use client"; // This component is interactive, so it's a Client Component

import React, { useState } from 'react';
import SidebarWidget from '../main/ui/SidebarWidget';

const BookingFormWidget = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  return (
    <SidebarWidget title="Contact for Booking">
      <div className="form-widget">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            name="message"
            placeholder="Type Comment Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="theme-btn">Send Now</button>
        </form>
      </div>
    </SidebarWidget>
  );
};

export default BookingFormWidget;