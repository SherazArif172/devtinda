const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sherazarif:Sheraz172@stayinnhostels.i25hv.mongodb.net/devtinder"
  );
};

connectDB()
  .then(() => {
    console.log("connected to the database...");
  })
  .catch((error) => {
    console.log("error connecting to the database", error);
  });

module.exports = { connectDB };
