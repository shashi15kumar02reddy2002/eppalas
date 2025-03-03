const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Increment stock count
router.put('/increment/:tagNumber', async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { tagNumber: req.params.tagNumber },
      { $inc: { stockCount: 1 } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrement stock count
router.post('/sell/:tagNumber', async (req, res) => {
  try {
    console.log("Sell API called with tag:", req.params.tagNumber);

    const item = await Item.findOneAndUpdate(
      { tagNumber: req.params.tagNumber },
      { $inc: { stockCount: -1 }, sold: true, soldDate: new Date() },
      { new: true }
    );

    if (!item) {
      console.log("Item not found in MongoDB!");
      return res.status(404).json({ message: 'Item not found' });
    }

    console.log("Item successfully updated:", item);
    res.json(item);
  } catch (error) {
    console.error("Error in sell API:", error);
    res.status(500).json({ error: error.message });
  }
});


// Get in-stock items
router.get('/in-stock', async (req, res) => {
  try {
    const items = await Item.find({ sold: false });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sold items
router.get('/sold-items', async (req, res) => {
  try {
    const items = await Item.find({ sold: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sell multiple items
router.post('/sell-multiple', async (req, res) => {
  try {
    const { tagNumbers } = req.body;

    console.log("Selling multiple items:", tagNumbers);

    const result = await Item.updateMany(
      { tagNumber: { $in: tagNumbers } },
      { $inc: { stockCount: -1 }, sold: true, soldDate: new Date() }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No items found to sell." });
    }

    console.log("Items successfully sold:", result);
    res.json({ message: "Items sold successfully!", result });

  } catch (error) {
    console.error("Error selling items:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;