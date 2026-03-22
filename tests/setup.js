const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongod;

// Antes de todos los tests: arranca la DB en memoria y conecta Mongoose
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

// Antes de cada test: limpia todas las colecciones
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Al final de todos los tests: desconecta y para la DB
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
