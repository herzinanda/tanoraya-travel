import React from "react";

const SearchDestination = () => {
  return (
    <div className="hero-bottom">
      <div className="booking-list-area section-bg">
        <div className="booking-list style-2">
          <div className="icon">
            <i className="fa-solid fa-location-dot"></i>
            <h6>Location</h6>
          </div>
          <div className="form">
            <select>
              <option>Where are you going?</option>
              <option value="london">london</option>
              <option value="Munich">Munich</option>
              <option value="Berlin">Berlin</option>
              <option value="Maldives">Maldives</option>
            </select>
          </div>
        </div>
        <div className="booking-list">
          <div className="icon">
            <i className="fa-light fa-calendar-days"></i>
            <h6>Check in</h6>
          </div>
          <div className="form">
            <div className="box">
              <input type="date" id="calendar" name="Add Date" />
            </div>
          </div>
        </div>
        <div className="booking-list">
          <div className="icon">
            <i className="fa-light fa-calendar-days"></i>
            <h6>Check Out</h6>
          </div>
          <div className="form">
            <div className="box">
              <input type="date" id="calendar2" name="Add Date" />
            </div>
          </div>
        </div>
        <div className="booking-list">
          <div className="form">
            <select>
              <option>Guests</option>
              <option value="london">01</option>
              <option value="Munich">02</option>
              <option value="Berlin">03</option>
              <option value="Maldives">04</option>
            </select>
          </div>
        </div>
        <button className="theme-btn" type="submit">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDestination;
