// controllers/bookingController.js
import moment from "moment";
import BookingModel from "../models/Roombooking.js";
import RoomModel from "../models/Room.js";

const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, totalPrice, guests } = req.body;
    const userId = req.user.userId;

    if (!roomId || !checkInDate || !checkOutDate || !totalPrice || !guests) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const room = await RoomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    const newBooking = new BookingModel({
      room: roomId,
      user: userId,
      guests,
      checkInDate,
      checkOutDate,
      totalPrice,
      transactionId: "1234", // placeholder
    });

    await newBooking.save();

    room.unavailableDates.push({
      bookingId: newBooking._id,
      userId,
      fromDate: checkInDate,
      toDate: checkOutDate,
      status: "booked",
    });

    await room.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: {
        ...newBooking._doc,
        checkInDate: moment(newBooking.checkInDate).format("DD-MM-YYYY"),
        checkOutDate: moment(newBooking.checkOutDate).format("DD-MM-YYYY"),
      },
    });
  } catch (error) {
    console.error("Error in creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/bookingController.js

const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ From verified JWT token

    const bookings = await BookingModel.find({ user: userId })
      .populate("room")
      .sort({ bookingDate: -1 });

    res.status(200).json({
      message: "User bookings fetched successfully",
      bookings: bookings.map((booking) => ({
        ...booking._doc,
        checkInDate: moment(booking.checkInDate).format("DD-MM-YYYY"),
        checkOutDate: moment(booking.checkOutDate).format("DD-MM-YYYY"),
      })),
    });
  } catch (error) {
    console.error("Error in getBookingsByUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { createBooking, getBookingsByUser };
