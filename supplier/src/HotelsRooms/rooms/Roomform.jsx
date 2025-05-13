import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './room.css';

function Roomform() {
  const { hotelId } = useParams();
  const [roomData, setRoomData] = useState({
    title: '',
    price: '',
    maxPeople: '',
    desc: '',
    facilities: '',
    roomNumber: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRoomData((prev) => ({
      ...prev,
      images: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in roomData) {
      if (key !== 'images') {
        formData.append(key, roomData[key]);
      }
    }

    for (let i = 0; i < roomData.images.length; i++) {
      formData.append('images', roomData.images[i]);
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/room/${hotelId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Room Created:', response.data);
      alert('Room created successfully!');
      setRoomData({
        title: '',
        price: '',
        maxPeople: '',
        desc: '',
        facilities: '',
        roomNumber: '',
        images: [],
      });
    } catch (error) {
      console.error('Error creating room:', error);
      alert('There was an error creating the room. Please try again.');
    }
  };

  return (
    <div className="room-form-container">
      <form onSubmit={handleSubmit} className="room-form">
        <h2>Add Room</h2>
        <div className="form-group">
          <input
            id="title"
            name="title"
            placeholder="Room Title"
            value={roomData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group inline-fields">
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            placeholder="Price"
            value={roomData.price}
            onChange={handleChange}
            required
          />
          <input
            id="maxPeople"
            name="maxPeople"
            type="number"
            min="1"
            placeholder="Max People"
            value={roomData.maxPeople}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            id="desc"
            name="desc"
            placeholder="Descriptions"
            value={roomData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="facilities"
            name="facilities"
            placeholder="Facilities (comma separated)"
            value={roomData.facilities}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="roomNumber"
            name="roomNumber"
            type="text"
            placeholder="Room Number"
            value={roomData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="images"
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default Roomform;
