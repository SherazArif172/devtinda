import express from "express";
import userAuth from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    console.log(loggedinUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;
