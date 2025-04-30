import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { validateEditProfile } from "../utils/signup.validator.js";
import bcrypt from "bcrypt";

const profileRouter = express.Router();

// Get user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    validateEditProfile(req);
    const loggedUser = req.user;
    console.log("loggedUser", loggedUser);

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();

    res
      .status(200)
      .json({ message: "user updated successfully", data: loggedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.user;
    console.log("old password", req.body.oldPassword);

    const passwordMatch = await bcrypt.compare(req.body.oldPassword, password);
    if (!passwordMatch) {
      throw new Error("invalid credentials");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      req.user.password = hashedPassword;
    }
    await req.user.save();

    console.log("password", password);
    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default profileRouter;
