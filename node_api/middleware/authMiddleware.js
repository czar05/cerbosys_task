const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded;

    const id = decoded.user_id;
    const user = await User.findById({ _id: id });
    if (user.status !== 1) {
      return res.status(403).send("User is not verifies yet");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
