import Supplier from '../models/Supplier.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, supplyType } = req.body;

    const existing = await Supplier.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const newSupplier = await Supplier.create({ name, email, password, supplyType });
    const token = generateToken(newSupplier._id);

    res.status(201).json({ token, supplier: newSupplier });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const supplier = await Supplier.findOne({ email });

    if (!supplier || !(await supplier.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(supplier._id);
    res.status(200).json({ token, supplier });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
