const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user"); // Import user model

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Store username and hashed password in variables
const storedUsername = 'admin';
const storedPassword = bcrypt.hashSync('password123', 10);

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
