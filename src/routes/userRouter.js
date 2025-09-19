const express = require('express')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

userRouter.get("/profile/view", async (req, res) => {
  try {
    const {auth_token} = req.cookies;
    if(!auth_token){
      throw new Error("Unauthorized")
    }
    const {userID} = jwt.verify(auth_token , 'Eradicator@123')
    const user = await User.findById(userID);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter