const mongoose = require("mongoose");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/products/image");
const multer = require("multer");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },

    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// statics
productSchema.statics.uploadAvatar = multer({ storage: storage }).single(
  "imageUrl"
);
productSchema.statics.avatarPath = AVATAR_PATH;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
