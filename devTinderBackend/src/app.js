const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/userSchema.js");

const app = express();
// app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "sherazz",
      lastName: "arif",
      email: "sherazarifofficialll@gmail.com",
      password: "sheraz12333",
      age: 25,
      gender: "male",
    });

    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
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
