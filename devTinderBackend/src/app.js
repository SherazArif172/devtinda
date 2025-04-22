const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/userSchema.js");
const { signupVlidator } = require("./utils/signup.validator.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.middleware.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

//signup the users
app.post("/signup", async (req, res) => {
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

    res.send("User created successfully");
    console.log("user created successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

//login the users
app.post("/login", async (req, res) => {
  try {
    const { token } = req.cookies;

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
      user.id,
      "sherazarifofficial@gmail.com",
      { expiresIn: "1h" }
    );

    res.cookie("token", encodedToken, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("user logged in successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

// profile of the user
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
    res.send("user profile fetched successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send(error.message);
  }
});

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
