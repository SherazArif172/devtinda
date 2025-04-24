import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

import authRouter from "./router/auth.router.js";
app.use("/", authRouter);

//server and db configration
const startServer = async () => {
  try {
    console.log("Connecting to DB...");

    await connectDB();
    console.log("DB connected. Starting server...");

    app.listen(3000, () => {
      console.log("Server is running on port 3000...");
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
};
startServer();
