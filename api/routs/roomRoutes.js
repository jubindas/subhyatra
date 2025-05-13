import express from 'express';
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getAllRoom,
} from '../controllers/roomController.js';
import upload from '../utils/multer.js';

const router = express.Router();

// Route to create room with image upload
router.post('/room/:hotelid', upload.array('images', 3), createRoom);

// Route to update room by ID
router.put('/room/:id', updateRoom);


// Route to delete room by ID and hotel ID
router.delete('/rooms/:id/:hotelid', deleteRoom);

// Route to get room by ID
router.get('/room/:id', getOneRoom);

// Route to get all rooms
router.get('/rooms', getAllRoom);

export default router;
