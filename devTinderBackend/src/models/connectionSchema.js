import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["interested", "ignored", "accepted", "rejected"],
    default: "interested",
  },
});

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre("save", function () {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
});

const connectionRequestSchema = mongoose.model("Connection", connectionSchema);
export default connectionRequestSchema;
