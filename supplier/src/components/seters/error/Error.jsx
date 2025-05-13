// Error.jsx
import React from 'react';

const Error = ({ message }) => {
  return (
    <div style={{
      padding: "15px",
      marginTop: "20px",
      borderRadius: "8px",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      fontWeight: "bold",
      textAlign: "center",
    }}>
      ❌ {message}
    </div>
  );
};

export default Error;
