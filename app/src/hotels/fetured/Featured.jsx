import React from 'react'
import "./feat.css"

const destinations = [
  {
    name: "New Delhi",
    image:
      "/img/delhi.jpg",
  },
  {
    name: "Assam",
    image:
      "/img/kamakhya.jpg",
  },
];

function Featured() {
  return (
    <div className="trending-section">
      <h2>Trending destinations</h2>
      <p>Most popular choices for travellers from India</p>

      <div className="destination-cards">
        {destinations.map((dest, index) => (
          <div className="destination-card" key={index}>
            <img src={dest.image} alt={dest.name} />
            <div className="destination-name">{dest.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured