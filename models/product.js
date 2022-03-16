const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["Ikea", "Liddy", "Caressa", "Marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

function checkQuery(queryObj) {
  const query = {};
  let sortStr = "";
  let selectStr = "";
  let limit = 10;
  let page = 1;
  let skip = 0;

  // Cheking for query parameters
  if ("featured" in queryObj) {
    query.featured = queryObj.featured;
  }
  if ("company" in queryObj) {
    query.company = { $regex: queryObj.company, $options: "i" };
  }
  if ("name" in queryObj) {
    query.name = { $regex: queryObj.name, $options: "i" };
  }
  if ("sort" in queryObj) {
    sortStr = queryObj.sort.replace(",", " ").replace(/\s+/g, " ").trim();
  }
  if ("select" in queryObj) {
    selectStr = queryObj.select.replace(",", " ").replace(/\s+/g, " ").trim();
  }
  if ("limit" in queryObj) {
    limit = Number(queryObj.limit);
  }
  if ("page" in queryObj) {
    page = Number(queryObj.page);
    // Pagination logic
    skip = (page - 1) * limit;
  }
  if ("numericFilters" in queryObj) {
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
    let filters = queryObj.numericFilters.replace(
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

  return {
    query,
    sortStr,
    selectStr,
    limit,
    skip,
  };
}

exports.Product = mongoose.model("Product", schema);
exports.checkQuery = checkQuery;
