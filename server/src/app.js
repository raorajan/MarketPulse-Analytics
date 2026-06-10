const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Welcome to MarketPulse Analytics Backend" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

module.exports = app;