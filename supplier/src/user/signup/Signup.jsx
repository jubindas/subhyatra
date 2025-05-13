import React, { useState } from 'react';
import axios from 'axios';
import Success from '../../components/seters/success/Success.jsx';
import Error from '../../components/seters/error/Error.jsx';
import { useNavigate } from 'react-router-dom'; 
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    supplyType: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); // ✅ Track error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types again
    setSuccess(false); // Clear success if typing again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/supplier/signup', formData);
      console.log('Response:', response.data);

      setSuccess(true);
      setError('');
      setFormData({
        name: '',
        email: '',
        password: '',
        supplyType: '',
      });
      navigate('/login');


    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setSuccess(false);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Supplier Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-input"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="signup-label"><strong>Select Supply Type:</strong></label>
          <select
            className="signup-select"
            name="supplyType"
            value={formData.supplyType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="hotel">Hotel</option>
            <option value="bus">Bus</option>
            <option value="car">Car</option>
          </select>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {/* ✅ Show success or error messages */}
        {success && <Success message="Supplier registered successfully!" />}
        {error && <Error message={error} />}
      </div>
    </div>
  );
}

export default Signup;
