import RoomModel from '../models/Room.js';
import HotelModel from '../models/Hotel.js';

// Create room
const createRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  const images = req.files ? req.files.map((file) => file.path.replace(/\\/g, '/')) : []; // Fix path to URL-friendly format

  // Create new room
  const newRoom = new RoomModel({
    ...req.body,
    images,
  });

  try {
    const savedRoom = await newRoom.save();
    await HotelModel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    res.status(200).json({
      message: 'Room added successfully!',
      room: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Room creation failed! Please try again later.',
    });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const updRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: updRoom });
  } catch (error) {
    res.status(500).json({ error: 'Room not updated!' });
  }
};


// Delete room
const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;

  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    await HotelModel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });

    res.status(200).json({ message: 'Room deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Room not deleted!' });
  }
};

// Get room by ID
const getOneRoom = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json({ message: room });
  } catch (error) {
    res.status(500).json({ error: 'Room not found!' });
  }
};

// Get all rooms with filters
const getAllRoom = async (req, res) => {
  try {
    const { location, guests, startDate, endDate } = req.query;

    // Filter hotels based on location
    const hotelFilter = location ? { city: { $regex: location, $options: 'i' } } : {};
    const hotels = await HotelModel.find(hotelFilter).populate('rooms');
    let allRooms = hotels.flatMap((hotel) => hotel.rooms);

    // Filter rooms based on guest count
    if (guests) {
      allRooms = allRooms.filter((room) => room.maxPeople >= parseInt(guests));
    }

    // Filter rooms based on availability (startDate and endDate)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Set time to 00:00:00 for accurate date comparisons
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      // Filter rooms that are not unavailable during the selected dates
      allRooms = allRooms.filter((room) =>
        room.unavailableDates.every(
          (unavailableDate) => 
            new Date(unavailableDate.toDate).setHours(0, 0, 0, 0) < start || 
            new Date(unavailableDate.fromDate).setHours(0, 0, 0, 0) > end
        )
      );
    }

    // Fix image paths to be URL-friendly
    allRooms = allRooms.map((room) => {
      room.images = room.images.map((image) => image.replace(/\\/g, '/')); // Replace \ with /
      return room;
    });

    res.status(200).json({ message: allRooms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filtered rooms' });
  }
};


/*
const getAllRoom = async (req, res) => {
  try {
    const { location, guests, startDate, endDate } = req.query;

    // Filter hotels based on location
    const hotelFilter = location ? { city: { $regex: location, $options: 'i' } } : {};
    const hotels = await HotelModel.find(hotelFilter).populate('rooms');
    let allRooms = hotels.flatMap((hotel) => hotel.rooms);

    // Filter rooms based on guest count
    if (guests) {
      allRooms = allRooms.filter((room) => room.maxPeople >= parseInt(guests));
    }

    // Filter rooms based on availability (startDate and endDate)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Filter rooms that are not unavailable during the selected dates
      allRooms = allRooms.filter((room) =>
        room.unavailableDates.every(
          (unavailableDate) =>
            new Date(unavailableDate.fromDate) > end || new Date(unavailableDate.toDate) < start
        )
      );
    }

    // Fix image paths to be URL-friendly
    allRooms = allRooms.map((room) => {
      room.images = room.images.map((image) => image.replace(/\\/g, '/')); // Replace \ with /
      return room;
    });

    res.status(200).json({ message: allRooms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filtered rooms' });
  }
};
*/

export {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getAllRoom,
  
};
