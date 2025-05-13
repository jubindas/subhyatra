// components/Bookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./book.css";
import SpinLoading from './../../../set/spin/SpinLoading.jsx';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/bookings/mybooking", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send JWT in Authorization header
          },
        });
        

        

        if (response.data && response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          setBookings([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to fetch bookings.");
        }
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <SpinLoading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="bookings-container">
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        bookings.map((booking, index) => (
          <div className="booking-card" key={index}>
            <h2 className="hotel-name">{booking.room?.name || "Hotel Name"}</h2>
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>Transaction ID:</strong> {booking.transactionId}</p>
            <p><strong>Check In:</strong> {booking.checkInDate}</p>
            <p><strong>Check Out:</strong> {booking.checkOutDate}</p>
            <p><strong>Amount:</strong> ₹{booking.totalPrice}</p>
            <p><strong>Total Guests:</strong> {booking.guests}</p>
            <p><strong>Status:</strong>{" "}
              <span className={`status-tag ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </p>
            <button className="cancel-button">Cancel Booking</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Bookings;
