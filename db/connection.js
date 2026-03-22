const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("La variable de entorno MONGODB_URI no esta definida.");
  }

  await mongoose.connect(uri);
  isConnected = true;
  console.log("Conectado a MongoDB");
}

module.exports = connectDB;
