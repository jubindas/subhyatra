/* eslint-disable comma-dangle */
// external import
import mongoose from "mongoose";

// Define room schema
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
    },
    desc: {
      type: [String], // better than generic Array
      required: true,
    },

    unavailableDates: [
      {
        bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        fromDate: Date,
        toDate: Date,
        status: { type: String, default: 'booked' }
      }
    ],
    
    facilities: {
      type: [String],
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
