const express = require("express");
const app = express();
const { User } = require("./models/user");
const connectDB = require("./config/database");
const { validateSignUp } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require('validator')

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});

app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    validateSignUp(req.body);
    const { firstName, lastName, email, password, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
    });
    await user.save();
    res.send("User saved succesfully");
  } catch (err) {
    res.status(401).send("Adding user got failed: " + err.message);
  }
});

app.patch("/user:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    console.log(userID);
    const user = await User.findByIdAndUpdate(userID, req.body);
    await user.save();
    res.send("User updated succesfully");
  } catch (err) {
    res.status(401).send("Update got failed: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Sorry Friend, Enter a valid email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Sorry Friend, Invalid Credentials");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      res.send("Login Succesful");
    } else {
      throw new Error("Sorry Friend, Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Login Failed: " + err.message);
  }
});
