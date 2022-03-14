const errorHandlerMiddlware = async (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ msg: "Oops! Something went wrong!" });
};

module.exports = errorHandlerMiddlware;
