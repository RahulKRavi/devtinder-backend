const express = require("express");
const { User } = require("../models/user");
const { Connection } = require("../models/connection");
const {userAuth} = require('../middlewares/auth')

const connectionRouter = express.Router();

connectionRouter.post("/connection/send/:status/:userID", userAuth, async (req, res) => {
  try {
    const fromUserId = req.userID;
    const toUserId = req.params.userID;
    const status = req.params.status;

    if (fromUserId === toUserId) {
      return res.status(400).json({
        message: "Connection cannot be send to same user",
      });
    }

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Connection status is not valid" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res
        .status(400)
        .json({ message: "Connection can only be send to a valid user" });
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    console.log(existingConnection)
    if(existingConnection) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    const data = new Connection({
      fromUserId,
      toUserId,
      status
    });

    await data.save();
    res.json({ message: "Connection Added Succesfully", data: data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = connectionRouter;
