const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/userSchema.js");

const app = express();
app.use(express.json());

//posting the users
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully");
    console.log("user created successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Error creating user");
  }
});

//getting the user by id
// app.get("/signup", async (req, res) => {
//   console.log();
//   const user = await User.findOne({ email: req.body.email });
//   res.send(user);
//   console.log("user fetched successfully");
// });

//getting all the usres
// app.get("/signup", async (req, res) => {
//   const users = await User.find({});

//   res.send(users);
//   console.log("users fetched successfully");
// });

//getting the user by id
app.get("/signup/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.send("no user found");
    } else {
      res.send(user);
      console.log("user fetched successfully");
    }
  } catch (error) {
    console.log("error fetching user:", error.message);
  }
});

// delete the user by id
app.delete("/signup/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("user deleted successfully");
});

//update the user by id

app.patch("/signup", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, req.body, {
      returnDocument: "after",
    });
    res.send("user updated successfully");
    console.log(user);
  } catch (error) {}
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
