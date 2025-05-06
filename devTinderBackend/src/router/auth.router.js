import express from "express";
import { signupVlidator } from "../utils/signup.validator.js";
import userAuth from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const authRouter = express.Router();

//signup the users
authRouter.post("/signup", async (req, res) => {
  try {
    signupVlidator(req);
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.json({ message: "User created successfully" });
    console.log("user created successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

//login the users
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("invalid credentials");
    }

    const encodedToken = await jwt.sign(
      { id: user.id },
      "sherazarifofficial@gmail.com",
      { expiresIn: "1h" }
    );

    if (!encodedToken) {
      throw new Error("tken is expired");
    }

    res.cookie("token", encodedToken, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        name: user.firstName,
        email: user.email,
        photoUrl: user.photoUrl,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

// profile of the user
authRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("user logged out successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default authRouter;
