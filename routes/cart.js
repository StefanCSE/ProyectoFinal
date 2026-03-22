const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { getProducts, getCart, saveCart } = require("../db/helpers");

// Endpoint POST /cart - Agregar un producto al carrito
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Faltan campos: productId, quantity" });
  }

  const products = getProducts();
  const cart = getCart();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (product.stock < parseInt(quantity)) {
    return res.status(400).json({ error: "Stock insuficiente" });
  }

  // Si el producto ya esta en el carrito, sumamos la cantidad
  const existing = cart.find((item) => item.productId === parseInt(productId));

  if (existing) {
    existing.quantity += parseInt(quantity);
  } else {
    const cartItem = new Cart(product.id, product.name, quantity, product.price);
    cart.push(cartItem);
  }

  saveCart(cart);

  res.status(201).json({ message: "Producto agregado al carrito", cart });
});

// Endpoint GET /cart - Ver el contenido del carrito
router.get("/", (req, res) => {
  const cart = getCart();
  res.json(cart);
});

module.exports = router;
