// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
