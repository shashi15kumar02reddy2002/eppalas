const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Store username and hashed password in variables
const storedUsername = 'admin';
const storedPassword = bcrypt.hashSync('password123', 10);

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === storedUsername && bcrypt.compareSync(password, storedPassword)) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
