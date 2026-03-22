const fs = require("fs");
const path = require("path");

const PRODUCTS_FILE = path.join(__dirname, "products.json");
const CART_FILE = path.join(__dirname, "cart.json");

// Lee un archivo JSON y devuelve su contenido como objeto
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Escribe un objeto en un archivo JSON
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getProducts() {
  return readJSON(PRODUCTS_FILE);
}

function saveProducts(products) {
  writeJSON(PRODUCTS_FILE, products);
}

function getCart() {
  return readJSON(CART_FILE);
}

function saveCart(cart) {
  writeJSON(CART_FILE, cart);
}

module.exports = { getProducts, saveProducts, getCart, saveCart };
