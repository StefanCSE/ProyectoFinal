require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./db/connection");

const productsRouter = require("routes/products");
const cartRouter = require("routes/cart");
const checkoutRouter = require("routes/checkout");

const app = express();

app.use(express.json());

connectDB().catch(err => {
    console.error("Fallo conexion DB:", err);
});

// Registrar las rutas
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

// Servidor local de prueba
if (require.main === module) {
  app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001/index.html`);
  });
}

module.exports = app;
