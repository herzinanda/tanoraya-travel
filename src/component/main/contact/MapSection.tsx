import React from 'react'

const MapSection = () => {
  return (
    <div className="map-section">
      <div className="map-items">
        <div className="googpemap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.468591613895!2d98.66611!3d3.5896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e3c481d9bdf%3A0xf0bae52f9b7db39c!2sMedan%20Kota%2C%20Kota%20Medan%2C%20Sumatera%20Utara!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

export default MapSection
