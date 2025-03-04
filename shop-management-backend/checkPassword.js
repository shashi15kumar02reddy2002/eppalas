require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user"); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const passwordToCheck = "password123"; // The password you want to check
    const user = await User.findOne({ username: "admin" }); // Fetch the user

    if (user) {
      const isMatch = bcrypt.compareSync(passwordToCheck, user.password);
      console.log("Password match:", isMatch); // Should log true if the password matches
    } else {
      console.log("User  not found.");
    }

    mongoose.connection.close(); // Close the connection after checking
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });