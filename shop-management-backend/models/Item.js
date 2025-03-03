const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  tagNumber: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  typeOfCloth: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stockCount: { type: Number, default: 0 },
  sold: { type: Boolean, default: false },
  soldDate: { type: Date, default: null },
});

module.exports = mongoose.model('Item', itemSchema);