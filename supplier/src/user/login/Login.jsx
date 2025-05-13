import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/supplier/login', formData);
      const { token, supplier } = res.data;

      console.log('Login successful:', supplier);

      // Save token and supplier ID to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('supplierId', supplier._id); // Save supplierId in localStorage

      // Redirect based on supplyType using if-else
      if (supplier.supplyType === 'hotel') {
        navigate('/hotels');
      } else if (supplier.supplyType === 'bus') {
        navigate('/supplier/buses');
      } else if (supplier.supplyType === 'car') {
        navigate('/supplier/cars');
      } else {
        alert('Unknown supply type. Please contact support.');
      }
      
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Supplier Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
