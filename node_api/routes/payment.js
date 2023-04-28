const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const router = express.Router();

router.post("/checkout", paymentsController.checkout);
router.post("/paymentverification", paymentsController.paymentVerification);
module.exports = router;
