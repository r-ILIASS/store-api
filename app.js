require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

require("./startup/routes")(app);

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
