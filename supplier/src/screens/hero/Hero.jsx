import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './hero.css';

export default function Hero() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('You must be logged in to view hotels!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/supplier/hotels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHotels(response.data.message); // set the hotels array
      } catch (error) {
        console.error('Error fetching hotels:', error);
        alert('Failed to fetch hotels. Please try again.');
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="my-hotels-container">
      <div className="header">
        <h1>My Hotels</h1>
        <button className="add-hotel-btn">
          <Link to="addHotel">Add Hotel</Link>
        </button>
      </div>

      {hotels.length === 0 ? (
        <p>No hotels found. Please add a hotel.</p>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <h2 className="hotel-name">{hotel.name}</h2>
            <p className="hotel-description">{hotel.desc}</p>

            <div className="hotel-info">
              <div className="info-box">
                <span className="info-icon">🏨</span>
                <span>{hotel.type}</span>
              </div>
              <div className="info-box">
                <span className="info-icon">🏙️</span>
                <span>{hotel.city}</span>
              </div>
              <div className="info-box">
                <span className="info-icon">📍</span>
                <span>{hotel.address}</span>
              </div>
            </div>

            <div className="card-buttons">
              <button className="view-details-btn">
                <Link to={`addRoom/${hotel._id}`}>Add Rooms</Link> {/* Pass hotelId in URL */}
              </button>
              <button className="update-hotel-btn">Update Hotel</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
