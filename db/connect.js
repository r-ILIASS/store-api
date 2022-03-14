const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("Something went wrong connecting to mongodb ");
        throw new Error(err);
      } else {
        console.log("Connected to mongoDB");
      }
    }
  );
};

module.exports = connectDB;
