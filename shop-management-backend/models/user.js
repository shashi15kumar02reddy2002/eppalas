const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = bcrypt.hashSync("password123", 10);
  const user = new User({
    username: "admin",
    password: hashedPassword,
  });

  await user.save();
  console.log("Test user created successfully!");
  mongoose.disconnect();
})();