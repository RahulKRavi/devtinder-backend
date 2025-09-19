const express = require("express");
const { User } = require("../models/user");;
const { userAuth } = require("../middlewares/auth");
const { validateProfileUpdate } = require('../utils/validate')

const userRouter = express.Router();

userRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileUpdate(req.body);
    const updatedUser = await User.findByIdAndUpdate(req.userID, req.body);
    await updatedUser.save();
    res.json({ message: "User Updation Succesful", data: updatedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
