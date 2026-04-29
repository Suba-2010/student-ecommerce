const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 📦 GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// 🛒 PLACE ORDER
router.post("/place", async (req, res) => {
  try {
    const cartItems = await Cart.find();

    let total = 0;

    const formattedItems = cartItems.map(item => {
      total += item.price * item.quantity; // ✅ CALCULATE TOTAL

      return {
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      };
    });

    const order = new Order({
      items: formattedItems,
      total
    });

    await order.save();

    // Clear cart
    await Cart.deleteMany();

    res.json({ message: "Order placed successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;