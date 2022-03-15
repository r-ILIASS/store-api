const Product = require("../models/product");

// Static
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name price");
  res.status(200).json(products);
};

// Dynamic
const getAllProducts = async (req, res) => {
  const query = {};
  let sortStr = "";

  if ("featured" in req.query) {
    query.featured = req.query.featured;
  }
  if ("company" in req.query) {
    query.company = { $regex: req.query.company, $options: "i" };
  }
  if ("name" in req.query) {
    query.name = { $regex: req.query.name, $options: "i" };
  }
  if ("sort" in req.query) {
    sortStr = req.query.sort.replace(",", " ").replace(/\s+/g, " ").trim();
  }

  const products = await Product.find(query).sort(sortStr);
  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
