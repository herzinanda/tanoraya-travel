'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Destination {
  id: string;
  title: string;
  destinationUrl: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SearchDestination = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((data) => setDestinations(data))
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (month) params.set("month", month);
    if (guests) params.set("guests", guests);
    router.push(`/tour-packages/tour?${params.toString()}`);
  };

  return (
    <div className="hero-bottom">
      <div className="booking-list-area section-bg">
        <div className="booking-list style-2">
          <div className="icon">
            <i className="fa-solid fa-location-dot"></i>
            <h6>Location</h6>
          </div>
          <div className="form">
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">Where are you going?</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.destinationUrl || d.title}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="booking-list">
          <div className="icon">
            <i className="fa-light fa-calendar-days"></i>
            <h6>Travel Month</h6>
          </div>
          <div className="form">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="booking-list">
          <div className="form">
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="">Guests</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="theme-btn" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDestination;
