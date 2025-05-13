import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomList.css';
import { Link } from 'react-router-dom';
import SpinLoading from '../../set/spin/SpinLoading.jsx';

function RoomList({ filters }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async (filterParams) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/rooms', {
        params: {
          location: filterParams.location,
          guests: filterParams.persons,
          startDate: filterParams.startDate,
          endDate: filterParams.endDate,
        },
      });
      setRooms(response.data.message);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedFilters = JSON.parse(localStorage.getItem("searchFilters"));

    if (storedFilters) {
      fetchRooms(storedFilters);
    } else if (filters) {
      fetchRooms(filters);
    }
  }, [filters]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="room-list">
      <h2>Available Rooms</h2>

      {loading && <SpinLoading />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && rooms.length === 0 && <p>No rooms found matching your filters.</p>}

      {rooms.map((room) => (
        <div key={room._id} className="room-card">
          <div className="room-images">
            {room.images && room.images.length > 0 ? (
              <img
                src={`http://localhost:5000/${room.images[0].replace(/\\/g, '/')}`}
                alt="main"
                className="room-list-image"

              />
            ) : (
              <img
                src="/default-room.jpg"
                alt="default"
                className="room-image"
              />
            )}
          </div>
          <div className="room-info">
            <h3 className="room-title">{room.title}</h3>
            <p className="room-location">{room.desc}</p>
            <p className="room-price">Price: ₹{room.price}</p>
            <p className="room-guests">Guests: Up to {room.maxPeople}</p>
            <div className="btns">
              <Link 
                to={`/view-details/${room._id}/${formatDate(filters?.startDate)}/${formatDate(filters?.endDate)}`} 
                className="view-btn"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
