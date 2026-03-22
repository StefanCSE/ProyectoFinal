const request = require("supertest");
const app = require("../server");
const { saveProducts, saveCart, getProducts, getCart } = require("../db/helpers");

beforeEach(() => {
  saveProducts([]);
  saveCart([]);
});

describe("Endpoint de Checkout", () => {
  test("POST /checkout - Debe realizar el pago correctamente", async () => {
    // Creamos producto y lo agregamos al carrito
    await request(app).post("/products").send({
      name: "Camara",
      price: 300.0,
      stock: 5,
    });

    await request(app).post("/cart").send({ productId: 1, quantity: 2 });

    const res = await request(app).post("/checkout");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("total");
    expect(parseFloat(res.body.total)).toBe(600.0);
    expect(res.body.itemsPurchased.length).toBe(1);
  });

  test("POST /checkout - El carrito debe quedar vacio despues del pago", async () => {
    await request(app).post("/products").send({
      name: "Tablet",
      price: 150.0,
      stock: 3,
    });

    await request(app).post("/cart").send({ productId: 1, quantity: 1 });
    await request(app).post("/checkout");

    const cart = getCart();
    expect(cart.length).toBe(0);
  });

  test("POST /checkout - El stock del producto debe reducirse despues del pago", async () => {
    await request(app).post("/products").send({
      name: "Impresora",
      price: 120.0,
      stock: 10,
    });

    await request(app).post("/cart").send({ productId: 1, quantity: 3 });
    await request(app).post("/checkout");

    const products = getProducts();
    expect(products[0].stock).toBe(7);
  });

  test("POST /checkout - Debe fallar si el carrito esta vacio", async () => {
    const res = await request(app).post("/checkout");

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
