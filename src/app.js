const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {User} = require('./models/user')

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rahulkr02042000:WfX1LS27biU8MI5f@devtinder.niawz6c.mongodb.net/devTinder"
  );
  console.log("Database connected")
};

connectDB().then(()=>{
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    })
})

app.post('/user',async (req,res)=>{
  const user = new User({
    firstName: "Rahul",
    lastName: "Ravi",
    email: "rahul@gmail.com",
    age: 24
  })
  await user.save()
  res.send("User saved succesfully")
})