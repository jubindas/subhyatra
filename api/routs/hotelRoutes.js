
// external import
import express from 'express';

// internal imports
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getSupplierHotels,
    getOneHotel,
    getAllHotel,
    getHotelByCity,
    getHotelByType,
    getHotelRooms,
} from '../controllers/hotelController.js';

import { protect } from '../middlewares/authSopplier.js';

const router = express.Router();

// CREATE hotel
router.post('/hotel/create', protect , createHotel);

// UPDATE hotel by ID
router.put('/hotel/:id',protect, updateHotel);

// DELETE hotel by ID
router.delete('/hotels/:id',protect, deleteHotel);

// GET all hotels for a specific supplier
router.get('/supplier/hotels', protect, getSupplierHotels);


// GET one hotel by ID
router.get('/hotel/:id', getOneHotel);

// GET all hotels with optional filters
router.get('/hotels', getAllHotel);

// GET hotel counts by city (query param: ?cities=delhi,mumbai)
router.get('/hotels/getHotelByCity', getHotelByCity);

// GET hotel counts by type
router.get('/hotels/getHotelByType', getHotelByType);

// GET all rooms for a hotel by ID
router.get('/rooms/:id', getHotelRooms);

export default router;
