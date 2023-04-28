const Product = require("../models/product");
const jwt = require("jsonwebtoken");

module.exports.create = async function (req, res) {
  console.log("body", req.body);
  const body = req.body;
  try {
    console.log("inside try block");
    if (!body.name || !body.description || !body.price) {
      throw new Error("Please enter all fields");
    }
    console.log("after try block");
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
    });
    console.log("product created");
    res.status(200).json({
      product: newProduct,
      message: "product is created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getAll = async function (req, res) {
  try {
    const product = await Product.find();

    res.status(200).json({ products: product });
  } catch (Error) {
    res.status(500).json({ message: Error.message });
  }
};
module.exports.update = async function (req, res) {
  const id = req.params.id;
  try {
    let product = await Product.findById(req.params.id);
    Product.uploadAvatar(req, res, function (err) {
      if (err) {
        console.log("****Multer Error:", err);
      }

      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      if (req.file) {
        //   this is saving the path of the uploaded file into the avatar field in the user
        if (product.imageUrl) {
          fs.unlinkSync(path.join(__dirname, "..", product.imageUrl));
        }

        product.imageUrl = Product.avatarPath + "/" + req.file.filename;
      }
      product.save();
      res.status(201).json({
        message: "updated product",
      });
    });
  } catch (error) {
    res.status(500).json({ message: Error.message });
  }
};
