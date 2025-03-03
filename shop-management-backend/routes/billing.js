const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Generate bill
router.post('/bill', async (req, res) => {
  const { tagNumbers } = req.body; // Array of tag numbers
  try {
    const items = await Item.find({ tagNumber: { $in: tagNumbers } });
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    // Mark items as sold
    await Item.updateMany(
      { tagNumber: { $in: tagNumbers } },
      { sold: true, soldDate: new Date() }
    );

    res.json({ items, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;