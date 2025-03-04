const User = require("../models/user"); // Import user model
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOne({ username: "admin" });
    console.log(user); // Check the user details
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });