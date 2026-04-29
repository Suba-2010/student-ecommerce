const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");  // ✅ mongoose model

router.post("/add", async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    const existing = await Cart.findOne({ productId });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
    } else {
      const newItem = new Cart({
        productId,
        name,
        price,
        image // ✅ SAVE IMAGE
      });

      await newItem.save();
    }

    res.json({ message: "Added to cart" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 📦 GET CART
router.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

// ❌ REMOVE ITEM
router.delete("/remove/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

// ➕➖ UPDATE QUANTITY
router.put("/update/:id", async (req, res) => {
  const { quantity } = req.body;

  await Cart.findByIdAndUpdate(req.params.id, { quantity });

  res.json({ message: "Quantity updated" });
});

module.exports = router;