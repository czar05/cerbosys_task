const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/node_api_test");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
