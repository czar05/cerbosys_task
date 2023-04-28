const express = require("express");

const router = express.Router();

router.use("/users", require("./user"));
router.use("/products", require("./product"));
router.use("/payments", require("./payment"));
module.exports = router;
