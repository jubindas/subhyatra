import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './view.css';
import SpinLoading from '../../../set/spin/SpinLoading.jsx';

function Viewdetails() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { roomId, startDate, endDate } = useParams();

  const storedFilters = JSON.parse(localStorage.getItem("searchFilters"));
  const maxCount = storedFilters ? storedFilters.persons : 1;

  // Check if user and token are available in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(storedUser);
    } else {
      console.log('No user or token found');
    }
  }, []);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/room/${roomId}`);
        setRoom(response.data.message);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch room details');
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const reformatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  const reformattedStartDate = reformatDate(startDate);
  const reformattedEndDate = reformatDate(endDate);

  const start = new Date(reformattedStartDate);
  const end = new Date(reformattedEndDate);

  if (isNaN(start) || isNaN(end)) {
    return <p style={{ color: 'red' }}>Invalid dates provided.</p>;
  }

  if (start > end) {
    return <p style={{ color: 'red' }}>Start date cannot be after end date.</p>;
  }

  const totalDays = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
  const rentPerDay = room?.price || 0;
  const totalAmount = rentPerDay * totalDays;

  const settings = {
    dots: true,
    infinite: room?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleBookRoom = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book the room.");
      navigate("/login");
      return;
    }
  
    if (!room) {
      alert("Room details are not available.");
      return;
    }
  
    const requestData = {
      roomId: room._id,
      userId: user.userId,
      checkInDate: reformattedStartDate,
      checkOutDate: reformattedEndDate,
      totalPrice: totalAmount,
      guests: maxCount,
    };
  
    console.log("Sending token:", token);  // Log the token for debugging
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/create",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token with request
          },
        }
      );
  
      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/my-bookings");
      } else {
        alert("Booking failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Booking failed. Please try again later.");
    }
  };
  

  if (loading) return <SpinLoading />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="view-details">
      {room && (
        <>
          <div className="carousel-container">
            <Slider {...settings}>
              {room.images && room.images.length > 0 ? (
                room.images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <div className="image-container">
                      <img
                        src={`http://localhost:5000/${image.replace(/\\/g, '/')}`}
                        alt={`room-image-${index}`}
                        className="room-details-image"
                      />
                      <div className="image-text">
                        <h3>{room.title}</h3>
                        <p>{room.desc}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="carousel-slide">
                  <div className="image-container">
                    <img src="/default-room.jpg" alt="default" className="room-image" />
                    <div className="image-text">
                      <h3>{room.title}</h3>
                      <p>{room.desc}</p>
                    </div>
                  </div>
                </div>
              )}
            </Slider>
          </div>
          <button onClick={handleBookRoom}>Book Now</button>
        </>
      )}
    </div>
  );
}

export default Viewdetails;
