import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import Member from "../models/Member.js";
// import jwt from "jsonwebtoken";

const router = express.Router();
let tokenBlacklist = [];

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Debugging: Check if email and password are received correctly
        console.log("Received email:", email);
        console.log("Received password:", password);
       
        // Check if the email exists in the database
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ error: "User not found" });
        }

        // Debugging: Log member data (except password)
        console.log("Member found:", member);

        // Check if the entered password matches the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, member.password);

        console.log(isMatch)

        // If passwords don't match, send an error response
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // If passwords match, generate a JWT token
        const token = jwt.sign(
            { id: member._id, role: member.role },
            "smart-leave-2025", // Replace with your actual secret key
            { expiresIn: "1d" }
            
        );
        console.log(token);

        // Respond with success and send the token and user role
        res.json({ message: "Login successful", token, role: member.role });
    } catch (err) {
        // Catch any errors and log them
        console.error("Error in login:", err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/logout", (req, res) => {
    try {
        // Get the token from the request (it could be in headers or cookies)
        const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is in the Authorization header

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // Add token to blacklist (optional for server-side invalidation)
        tokenBlacklist.push(token);
        console.log("Token added to blacklist:", token);

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logout:", err);
        res.status(500).json({ error: err.message });
    }
});


router.get("/validate", (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.json({ valid: false });
      }
  
      const decoded = jwt.verify(token, "smart-leave-2025");
      res.json({ valid: true, userId: decoded.id });
    } catch (err) {
      res.json({ valid: false });
    }
  });

export default router;