require("dotenv").config();
const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", proxy("http://auth:8081"));
app.use("/api/products", proxy("http://products:8081"));
app.listen(PORT, () => {
  console.log(`API Gateway en cours d\'exécution sur le port ${PORT}`);
});
