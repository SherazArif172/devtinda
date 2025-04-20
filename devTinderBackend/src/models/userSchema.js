const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
      min: [18, "You must be at least 18 years old"],
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          return ["male", "female", "shemale"].includes(value);
        },
        message: "Gender must be 'male', 'female', or 'shemale'.",
      },
    },
    about: {
      type: String,
      default: "This is the default about",
    },
    photoUrl: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "You can add a maximum of 10 skills.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
