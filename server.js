require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./db/connection");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Registrar las rutas
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

// Servidor local de prueba
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(3001, () => {
        console.log(`Servidor corriendo en http://localhost:3001/index.html`);
      });
    })
    .catch((err) => {
      console.error("Error al conectar con MongoDB:", err.message);
      process.exit(1);
    });
}

module.exports = app;
