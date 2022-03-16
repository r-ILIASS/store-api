const express = require("express");
const productsRouter = require("../routes/products");
const notFoundMiddleware = require("../middleware/not-found");
const errorMiddleware = require("../middleware/error-handler");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/v1/products", productsRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
