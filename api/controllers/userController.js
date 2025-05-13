import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



// Register User
export const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create a JWT token (No expiry set, token will be valid indefinitely)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

