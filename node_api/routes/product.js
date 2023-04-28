const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.post("/create", auth, productsController.create);
router.put("/update/:id", productsController.update);
router.get("/getAll", auth, productsController.getAll);

module.exports = router;
