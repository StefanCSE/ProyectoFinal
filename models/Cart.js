// Clase que representa un item dentro del carrito
class Cart {
  constructor(productId, productName, quantity, price) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = parseInt(quantity);
    this.price = parseFloat(price);
  }
}

module.exports = Cart;
