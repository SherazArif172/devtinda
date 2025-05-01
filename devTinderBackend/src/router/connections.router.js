import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import connectionRequestSchema from "../models/connectionSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

const connectionsRouter = express.Router();

connectionsRouter.post(
  "/connection/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      console.log(toUserId);

      const status = req.params.status;
      const allowedStatus = ["ignored, interested"];
      if (allowedStatus.includes(status)) {
        return res.status(400).json({ message: "invalid status" });
      }
      const connectionRequest = new connectionRequestSchema({
        fromUserId,
        toUserId,
        status,
      });

      const existingRequest = await connectionRequestSchema.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      const existingToUserId = await User.findOne({ toUserId });
      if (existingToUserId) {
        return res.status(404).json({ message: "user not found" });
      }

      if (existingRequest) {
        return res.status(400).json({ message: "request already sent" });
      }

      await connectionRequest.save();

      res.status(200).json({
        message: "connection request created successfully",
        data: connectionRequest,
      });

      console.log("connectionRequest", connectionRequest);
    } catch (error) {
      console.error("Error creating connection request:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

connectionsRouter.post(
  "/connection/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const logedinUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "invalid status" });
      }

      const data = await connectionRequestSchema.findOne({
        _id: requestId,
        toUserId: logedinUserId,
        status: "interested",
      });

      console.log("data", data);

      if (!data) {
        return res.status(404).json({
          message: "connection request not found",
        });
      }

      data.status = status;
      await data.save();

      res.status(200).json({
        message: "connection request updated successfully",
        data,
      });
    } catch (error) {
      console.error("Error in /connection/review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default connectionsRouter;
