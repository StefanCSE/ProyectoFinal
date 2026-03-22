const express = require("express");
const path = require("path");

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

// Iniciar el servidor localmente
if (require.main === module) {
  app.listen(3001, () => {
    console.log(`Server de prueba: http://localhost:3001/index.html`);
  });
}

module.exports = app;
