// This module is for populating the database with dummy data.
require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const dummyData = require("./dummyData.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(dummyData);
    console.log("The database is populated");
  } catch (error) {
    console.log(error);
  }
};

start();

// Run: node populate.js