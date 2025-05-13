import React from 'react';
import './nav.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    // Remove token and supplierId from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("supplierId");
    // Redirect to login page
    window.location.reload(); 
    navigate("/");
    
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">subhyatra supplier</h1>
      </div>

      {!isLoggedIn ? (
        <div className="navbar-right">
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="nav-button">Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="navbar-right">
          <button className="nav-button"  onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
