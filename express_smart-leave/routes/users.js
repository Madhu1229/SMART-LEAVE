// controllers/authController.js
import User from "../models/User.js";
import members from "../members.js"; // Import your members database

export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Check if the email exists in the members database
    const member = members.find((member) => member.email === email);

    if (!member) {
      return res.status(400).json({ message: "Email not found in members database." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = await User.create({
      email,
      name,
      role: "user", // Default role for registered users
    });

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};