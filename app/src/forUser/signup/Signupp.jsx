import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './signu.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register', 
        formData, 
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log("Signup Success:", response.data);

      setFormData({
        name: '',
        email: '',
        mobile: '',
        password: ''
      });

      navigate('/login');

    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="tel" name="mobile" placeholder="Phone" required value={formData.mobile} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
