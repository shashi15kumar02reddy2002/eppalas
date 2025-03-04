const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://eppalas.netlify.app'], // Allow frontend access
  credentials: true
}));
app.use(express.json());

// Routes
const itemRoutes = require("./routes/items");
const stockRoutes = require("./routes/stock");
const billingRoutes = require("./routes/billing");
const authRoutes = require("./routes/auth");

app.use("/items", itemRoutes);
app.use("/stock", stockRoutes);
app.use("/billing", billingRoutes);
app.use("/auth", authRoutes);

// ✅ Default Route for Root URL (Fix "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("Welcome to the Eppalas Shop API! 🎉");
});

// ✅ Login Route
const storedPassword = bcrypt.hashSync("password123", 10);
app.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    if (bcrypt.compareSync(password, storedPassword)) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Logout Route
app.post("/logout", async (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Home Route
app.get("/home", async (req, res) => {
  try {
    res.json({ message: "Welcome to the home page" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Connect to MongoDB with Proper Error Handling
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Prevents long hangs if MongoDB is unreachable
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stops the server if DB connection fails
  });

// Start the Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
