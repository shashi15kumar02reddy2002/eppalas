require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  mongoose.connection.close(); // Close the connection after testing
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
});