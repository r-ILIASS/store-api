require("dotenv").config();
// express
const express = require("express");
const app = express();
app.use(express.json());

const connectDB = require("./db/connect");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Store Api</h1><a href='/api/v1/products'>Products route</a>");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // connect to mongodb
    await connectDB(process.env.MONGO_URI);
    // spin up the server
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log("Start Error: ", error);
  }
};
start();
