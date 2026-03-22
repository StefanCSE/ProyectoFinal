const express = require("express");
const router = express.Router();
const { getProducts, saveProducts, getCart, saveCart } = require("../db/helpers");

// Endpoint POST /checkout - Pago simulado y vaciado del carrito
router.post("/", (req, res) => {
  const cart = getCart();
  const products = getProducts();

  if (cart.length === 0) {
    return res.status(400).json({ error: "El carrito esta vacio" });
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    // Descontamos el stock del producto
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock -= item.quantity;
    }
  });

  saveProducts(products);
  saveCart([]);

  res.json({
    message: "Pago realizado con exito",
    itemsPurchased: cart,
    total: total.toFixed(2),
  });
});

module.exports = router;
