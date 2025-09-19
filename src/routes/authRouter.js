const express = require('express')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const { validateSignUp, validateLogin } = require('../utils/validate')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post('/signup',async (req, res) => {
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
    res.status(400).send("Adding user got failed: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const [matchPassword, user] = await validateLogin(req.body);
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

authRouter.post('/logout', async(req,res) => {
  try {
    res.cookie('auth_token',null,{expires: new Date(Date.now())}).send("Logout Succesfull")
  } catch (err) {
    res.status(400).send("Something Went Wrong: " + err.message);
  }
})

module.exports = authRouter