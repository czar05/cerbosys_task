const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async function (req, res) {
  const body = req.body;
  try {
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.password2 ||
      !body.phone
    ) {
      throw new Error("Please enter all fields");
    }
    if (body.password !== body.password2) {
      throw new Error("Passwords do not match");
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      throw new Error("email is already registered");
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(body.password, salt);

      const newUser = await User.create({
        name: body.name,
        password: password,
        email: body.email,
        phone: body.phone,
        status: body.status,
      });
      res
        .status(200)
        .json({ user: newUser, message: "user is registered successfully" });
    }
  } catch (Error) {
    res.status(500).json({ message: Error.message });
  }
};

module.exports.login = async function (req, res) {
  const body = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User is not registered");
    }
    const validPassword = bcrypt.compareSync(body.password, user.password);
    if (!validPassword) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign({ user_id: user._id }, "jwtsecret", {
      expiresIn: "2h",
    });
    res
      .status(200)
      .json({ message: "logged in successfully", user: user, token: token });
  } catch (Error) {
    res.status(500).json({ message: Error.message });
  }
};

module.exports.getAll = async function (req, res) {
  try {
    const user = await User.find();

    res.status(200).json({ users: user });
  } catch (Error) {
    res.status(500).json({ message: Error.message });
  }
};
