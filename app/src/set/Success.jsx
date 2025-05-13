// Success.jsx
import React from 'react';

const Success = ({ message }) => {
  return (
    <div style={{
      padding: "20px",
      marginTop: "20px",
      borderRadius: "8px",
      backgroundColor: "#d4edda",
      color: "#155724",
      fontWeight: "bold",
      textAlign: "center",
    }}>
      ✅ {message}
    </div>
  );
};

export default Success;
