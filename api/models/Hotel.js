/* eslint-disable comma-dangle */
// external import
import mongoose from 'mongoose';

// Hotel schema definition
const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['hotel', 'resort', 'villa', 'apartment', 'cabin'], // Optional, for filtering
        },
        city: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },

        pinCode: {
            type: Number,
            trim: true,
        },
      
        desc: {
            type: String,
            trim: true,
        },
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room',
            },
        ],
        
        featured: {
            type: Boolean,
            default: false,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier', // Linking the hotel to a specific supplier
            required: true,  // Ensure that a hotel must belong to a supplier
        },
    },
    { timestamps: true }
);

const HotelModel = mongoose.model('Hotel', hotelSchema);

export default HotelModel;
