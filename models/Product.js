// Clase que representa un producto en la tienda
class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = parseFloat(price);
    this.stock = parseInt(stock);
  }
}

module.exports = Product;
