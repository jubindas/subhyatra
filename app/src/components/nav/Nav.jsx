import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBed,
  FaTrain,
  FaBus,
  FaPlane,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

function Nav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if user is logged in (fetch from localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setUser(null);
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh page to update navbar
  };

  return (
    <div className="main">
      <nav className="navbar">
        <div className="logo">Subhyatra</div>

        <div className="nav-content">
          <div className="nav-links">
            <Link to="/" className="nav-item">
              <FaHome className="icon" />
              <span>Home</span>
            </Link>
            <Link to="/hotels" className="nav-item">
              <FaBed className="icon" />
              <span>Hotels</span>
            </Link>
            <Link to="/train" className="nav-item">
              <FaTrain className="icon" />
              <span>Train</span>
            </Link>
            <Link to="/bus" className="nav-item">
              <FaBus className="icon" />
              <span>Bus</span>
            </Link>
            <Link to="/flight" className="nav-item">
              <FaPlane className="icon" />
              <span>Flight</span>
            </Link>
          </div>

          <div className="auth-section">
            {user ? (
             <div className="profileWrapper">
             <button onClick={toggleDropdown} className="profileButton">
              Profile ⏷
             </button>
           
             {isDropdownOpen && (
               <div className="dropdown">
                 <Link to="/bookings" className="dropdownItem">
                   Bookings
                 </Link>
                 <button onClick={handleLogout} className="dropdownItem">
                   Logout
                 </button>
               </div>
             )}
           </div>
           
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="button">
                  Login
                </Link>
                <Link to="/signup" className="button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
