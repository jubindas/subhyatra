import express from "express";
import { createBooking, getBookingsByUser } from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a booking with authentication middleware
router.post("/create", authMiddleware, createBooking);

// Route for getting all bookings of the authenticated user
router.get("/mybooking", authMiddleware, getBookingsByUser);

export default router;

