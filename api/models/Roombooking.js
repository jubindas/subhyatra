import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guests: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  transactionId: { type: String },
  status: { type: String, default: "booked" },
  bookingDate: {
    type: Date,
    default: Date.now, // this will auto-store the date at booking creation time
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
