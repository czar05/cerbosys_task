const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const db = require("./config/db");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", require("./routes"));
app.listen(PORT, () => {
  console.log(`servere is listening on ${PORT}`);
});
