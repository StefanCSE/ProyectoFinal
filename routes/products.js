const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getProducts, saveProducts } = require("../db/helpers");

// Endpoint POST /products - Crear un nuevo producto
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: "Faltan campos: name, price, stock" });
  }

  const products = getProducts();
  const newId = products.length + 1;
  const newProduct = new Product(newId, name, price, stock);

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({ message: "Producto creado", product: newProduct });
});

// Endpoint GET /products - Listar todos los productos
router.get("/", (req, res) => {
  const products = getProducts();
  res.json(products);
});

module.exports = router;
