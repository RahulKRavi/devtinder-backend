const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')

const connectDB = require("./config/database");
const { User } = require("./models/user");
const { validateSignUp, validateLogin } = require("./utils/validate");

const app = express();

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const [matchPassword, user] = await validateLogin(req.body);
    console.log(matchPassword);
    if (matchPassword) {
      const token = jwt.sign({userID: user._id},'Eradicator@123')
      res.cookie("auth_token", token);
      res.send("Login Succesful");
    } else {
      throw new Error("Sorry Friend, Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Login Failed: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const {auth_token} = req.cookies;
    const {userID} = jwt.verify(auth_token , 'Eradicator@123')
    const user = await User.findById(userID);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
