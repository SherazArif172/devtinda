const express = require("express");
const { connectDB } = require("./config/database.js");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth.middleware.js");

app.get("/user", (req, res) => {
  try {
    throw new Error("user not found");
  } catch (error) {
    res.send("semthing went wrong");
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000...");
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
};

startServer();
