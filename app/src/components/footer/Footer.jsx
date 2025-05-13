import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>subhyatra</h2>
          <p>321, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="footer-section">
          <h3>Menu</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>More</h3>
          <ul>
            <li><a href="#">Landing Pages</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Navbars</a></li>
            <li><a href="#">Cards</a></li>
            <li><a href="#">Buttons</a></li>
            <li><a href="#">Carousels</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h3>Social Media Links</h3>
          <div className="icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2023 © subhyatra. All Rights Reserved.</p>
        <div className="terms">
          <a href="#">Terms of use</a> | <a href="#">Privacy policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer