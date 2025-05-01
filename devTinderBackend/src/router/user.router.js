import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import connectionRequestSchema from "../models/connectionSchema.js";
import User from "../models/userSchema.js";

const userRouter = express.Router();

const USER_DATA = "firstName lastName gender about age photoUrl skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequests = await connectionRequestSchema
      .find({
        toUserId: loggedinUser,
        status: "interested",
      })
      .populate("fromUserId", USER_DATA);

    res.status(200).json({
      message: " requests fetched successufully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const allConnections = await connectionRequestSchema
      .find({
        $or: [
          { toUserId: loggedinUser, status: "accepted" },
          { fromUserId: loggedinUser, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const data = allConnections.map((row) => {
      console.log(row.fromUserId._id.toString());
      // console.log(row.loggedinUser.toString());

      if (row.fromUserId._id.toString() === loggedinUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.status(200).json({
      message: "successfully fetched all the connections ",
      data: data,
    });

    console.log(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error while fetching the the connections",
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit > 50 ? 50 : limit;

    const skip = (page - 1) * 10;

    console.log(page, limit);

    const connectionRequests = await connectionRequestSchema
      .find({
        $or: [{ fromUserId: loggedinUser._id }, { toUserId: loggedinUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { id: { $ne: loggedinUser._id } },
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default userRouter;
