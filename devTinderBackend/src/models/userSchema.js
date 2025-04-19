const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    typeof: String,
  },
  lastName: {
    typeof: String,
  },
  email: {
    typeof: String,
    required: true,
    unique: true,
  },
  password: {
    typeof: String,
    required: true,
  },
  age: {
    typeof: Number,
  },
  gender: {
    typeof: String,
  },
});

module.exports = mongoose.model("User", userSchema);
