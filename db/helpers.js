const fs = require("fs");
const path = require("path");
const os = require("os");

const isVercel = process.env.VERCEL === "1";

const PRODUCTS_FILE = isVercel 
  ? path.join(os.tmpdir(), "products.json") 
  : path.join(__dirname, "products.json");

const CART_FILE = isVercel 
  ? path.join(os.tmpdir(), "cart.json") 
  : path.join(__dirname, "cart.json");

function initFiles() {
  if (isVercel) {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      const baseProducts = fs.readFileSync(path.join(__dirname, "products.json"), "utf-8");
      fs.writeFileSync(PRODUCTS_FILE, baseProducts);
    }
    if (!fs.existsSync(CART_FILE)) {
      const baseCart = fs.readFileSync(path.join(__dirname, "cart.json"), "utf-8");
      fs.writeFileSync(CART_FILE, baseCart);
    }
  }
}

initFiles();

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return []; 
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

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