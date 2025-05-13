import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Success from "../../set/Success";
import "./log.css";

const Loginn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, userId, name } = response.data;

      // ✅ Store token separately if needed for auth headers
      localStorage.setItem("token", token);

      // ✅ Store user info including userName for displaying in UI
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, userName: name, token })
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <Success
            message="Login Successful!"
            onClose={() => setSuccess(false)}
          />
        )}
        {loading && <p>Logging in...</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Loginn;
