import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoding = await jwt.verify(token, "sherazarifofficial@gmail.com");
    // console.log(decoding.id);

    const user = await User.findById(decoding.id);
    // console.log(user);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in userAuth middleware:", error.message);
    res.status(401).json({ message: error.message });
  }
};
export default userAuth;
