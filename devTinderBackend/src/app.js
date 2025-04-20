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
    res.status(500).send(error.message);
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

app.patch("/signup/:id", async (req, res) => {
  const data = req.body;
  const id = req.params?.id;

  try {
    // Validate the request body
    const ALLOWED_KEYS = [
      "lastName",
      "password",
      "age",
      "about",
      "gender",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_KEYS.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid update keys");
    }

    if (data.skills.length > 10) {
      return res.status(400).send("skills should be less than 10");
    }

    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully");
    console.log(user);
  } catch (error) {
    console.error("Error updating user:", error.message);
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
