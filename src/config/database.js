const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rahulkr02042000:WfX1LS27biU8MI5f@devtinder.niawz6c.mongodb.net/devTinder"
  );
  console.log("Database connected");
};

module.exports = connectDB