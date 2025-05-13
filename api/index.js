import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Use import instead of require
import bodyParser from "body-parser"; // ✅ Use import instead of require
import connectDB from "./config/db.js";
import userRoutes from "./routs/userRouts.js"; // ✅ Corrected path & spelling
import hotelRoutes from './routs/hotelRoutes.js';
import roomRoutes from './routs/roomRoutes.js';
import supplierRoutes from "./routs/supplierRoutes.js";
import path from "path"; // Add this to serve static files
import { fileURLToPath } from "url"; // Import fileURLToPath to get the current directory
import bookingRoutes from './routs/bookingRoutes.js'; // Import booking routes

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Use fileURLToPath and import.meta.url to get the current directory (equivalent to __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Correctly serve the 'uploads' folder

// Use routes
app.use("/api/auth", userRoutes); // ✅ Use correct route variable
app.use('/api', hotelRoutes); 
app.use('/api', roomRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5001; // Change from 5000 to 5001

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

