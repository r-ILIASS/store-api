const { Product, checkQuery } = require("../models/product");

// For manual tests
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");
  res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
  const { query, sortStr, selectStr, limit, skip } = checkQuery(req.query);

  // Fetching products
  const products = await Product.find(query)
    .sort(sortStr)
    .select(selectStr)
    .limit(limit)
    .skip(skip);
  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
