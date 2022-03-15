const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");
  res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
  const query = {};
  let sortStr = "";
  let selectStr = "";
  let limit = 10;
  let page = 1;
  let skip = 0;
  let numericFilters = {};

  // Cheking for query parameters
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
  if ("select" in req.query) {
    selectStr = req.query.select.replace(",", " ").replace(/\s+/g, " ").trim();
  }
  if ("limit" in req.query) {
    limit = Number(req.query.limit);
  }
  if ("page" in req.query) {
    page = Number(req.query.page);
    // Pagination logic
    skip = (page - 1) * limit;
  }
  if ("numericFilters" in req.query) {
    const options = ["price", "rating"];
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    // Regular expression to match [< > <= >= =]
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    // Replace all matches with the values from the map
    let filters = req.query.numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // Create an array of filters
    filters = filters.split(",");

    // Loop through the array to construct a mongoose
    // friendly query then add it to the query variable
    // ex: price-$gte-30 turns into price: {'$gte': 30}
    filters.forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        query[field] = { [operator]: Number(value) };
      }
    });
  }

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
