const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoding = await jwt.verify(token, "sherazarifofficial@gmail.com");
  console.log(decoding);

  const user = await User.findById(decoding);
  console.log(user);

  if (!user) {
    throw new Error("user not found");
  }

  req.user = user;
  next();
};

module.exports = {
  userAuth,
};
