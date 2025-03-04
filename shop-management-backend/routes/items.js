const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by tag number
router.get('/item/:tagNumber', async (req, res) => {
  try {
    const item = await Item.findOne({ tagNumber: req.params.tagNumber, sold: false, stockCount: { $gt: 0 } });
    if (!item) return res.status(404).json({ message: 'Item not found or out of stock' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
