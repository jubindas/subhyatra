import React, { useState } from 'react';
import axios from 'axios';
import './hotel.css';
import { useNavigate } from 'react-router-dom';

const HotelForm = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    type: 'hotel',
    city: '',
    address: '',
    pincode: '',  // Added pincode field
    desc: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // ✅ get token from localStorage

      if (!token) {
        alert('You must be logged in to create a hotel!');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/hotel/create',
        hotelData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token in headers
          },
        }
      );

      console.log('Hotel Created:', response.data);
      alert('Hotel created successfully!');
      navigate('/hotels'); // Redirect to hotels page after creation

      
      // Optional: reset form after creation
      setHotelData({
        name: '',
        type: 'hotel',
        city: '',
        address: '',
        pincode: '',  // Reset pincode
        desc: '',
      });

    } catch (error) {
      console.error('Error creating hotel:', error);
      alert('There was an error creating the hotel. Please try again.');
    }
  };

  return (
    <div className="hotel-form-container">
      <form onSubmit={handleSubmit} className="hotel-form">
        <h2>Create a Hotel</h2>

        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={hotelData.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={hotelData.type} onChange={handleChange}>
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="villa">Villa</option>
          <option value="apartment">Apartment</option>
          <option value="cabin">Cabin</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          value={hotelData.city}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={hotelData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode" // Added pincode field
            placeholder="Pincode"
            value={hotelData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="desc"
          placeholder="Description"
          value={hotelData.desc}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Hotel</button>
      </form>
    </div>
  );
};

export default HotelForm;
