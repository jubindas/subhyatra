
// external imports
import HotelModel from '../models/Hotel.js';
import RoomModel from '../models/Room.js';

// Create a new hotel

const createHotel = async (req, res) => {
    try {
        // Ensure the supplier is logged in (check for token)
        if (!req.supplier) {
            return res.status(401).json({ message: 'You must be logged in to create a hotel.' });
        }

        // Add the supplier ID to the hotel object before saving
        const newHotel = new HotelModel({
            ...req.body,
            supplier: req.supplier._id, // Associate the hotel with the logged-in supplier
        });

        const savedHotel = await newHotel.save();

        res.status(200).json({
            message: savedHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: `Hotel not created! ${error}`,
        });
    }
};























// Update a hotel

const updateHotel = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        // Check if the logged-in supplier owns the hotel
        if (hotel.supplier.toString() !== req.supplier._id.toString()) {
            return res.status(403).json({ message: 'You can only update your own hotels.' });
        }

        // Proceed with the update
        const updHotel = await HotelModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            message: updHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not updated!',
        });
    }
};


















// Delete a hotel

const deleteHotel = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        // Check if the logged-in supplier owns the hotel
        if (hotel.supplier.toString() !== req.supplier._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own hotels.' });
        }

        // Proceed with the delete
        await HotelModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Hotel deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not deleted!',
        });
    }
};



// Get all hotels for a supplier
const getSupplierHotels = async (req, res) => {
    try {
        // Fetch hotels that belong to the logged-in supplier
        const hotels = await HotelModel.find({ supplier: req.supplier._id });

        if (!hotels) {
            return res.status(404).json({ message: 'No hotels found for this supplier.' });
        }

        res.status(200).json({
            message: hotels,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching hotels.',
        });
    }
};









// Get one hotel by ID
const getOneHotel = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        res.status(200).json({
            message: hotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not found!',
        });
    }
};

// Get all hotels with optional filtering
const getAllHotel = async (req, res) => {
    const { min, max, ...others } = req.query;

    try {
        const hotels = await HotelModel.find({
            ...others,
            price: { $gt: min || 0, $lt: max || 10000 },
        }).limit(req.query.limit);

        res.status(200).json({
            message: hotels,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotels not found!',
        });
    }
};

// Get hotel count by city
const getHotelByCity = async (req, res) => {
    const cities = req.query.cities.split(',');

    try {
        const list = await Promise.all(
            cities.map((city) => HotelModel.countDocuments({ city }))
        );

        res.status(200).json({
            message: list,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Cannot find hotels by city name!',
        });
    }
};

// Get hotel count by type
const getHotelByType = async (req, res) => {
    try {
        const types = ['apartment', 'hotel', 'resort', 'villa', 'cabin'];

        const list = await Promise.all(
            types.map(async (type) => {
                const count = await HotelModel.countDocuments({ type });
                return { type, count };
            })
        );

        res.status(200).json({
            message: list,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Cannot find hotels by type!',
        });
    }
};

// Get all rooms for a specific hotel
const getHotelRooms = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        const roomList = await Promise.all(
            hotel.rooms.map((roomId) => RoomModel.findById(roomId))
        );

        res.status(200).json({
            message: roomList,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Cannot find rooms for this hotel!',
        });
    }
};

// export all handlers
export {
    createHotel,
    updateHotel,
    deleteHotel,
    getSupplierHotels,
    getOneHotel,
    getAllHotel,
    getHotelByCity,
    getHotelByType,
    getHotelRooms,
};
