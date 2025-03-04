require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user"); // Import the User model

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existingUser  = await User.findOne({ username: "admin" });

    if (existingUser ) {
      console.log("✅ Admin user already exists.");
    } else {
      const hashedPassword = bcrypt.hashSync("password123", 10);
      const newUser  = new User({ username: "admin", password: hashedPassword });

      await newUser .save();
      console.log("✅ Admin user created: Username: admin, Password: password123");
    }

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });