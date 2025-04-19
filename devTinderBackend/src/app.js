const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth.middleware.js");

// app.use("/admin", adminAuth);
// app.use("/user", userAuth);

// app.get("/user/data", (req, res, next) => {
//   res.send("user data ");
// });
// app.get("/admin/data", (req, res, next) => {
//   res.send("admin data ");
// });
app.get("/user", (req, res) => {
  try {
    throw new Error("user not found");
  } catch (error) {
    res.send("semthing went wrong");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
