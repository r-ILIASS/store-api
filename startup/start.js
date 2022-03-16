const connectDB = require("../db/connect");

const port = process.env.PORT || 5000;
module.exports = async function start(app) {
  try {
    // connect to mongodb
    await connectDB(process.env.MONGO_URI);
    // spin up the server
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log("Start Error: ", error);
  }
};
