const express = require("express");
const app = express();
const { User } = require("./models/user");
const connectDB = require('./config/database')

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});

app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User saved succesfully");
  } catch (err) {
    res.status(401).send("Adding user got failed: " + err.message);
  }
});

app.patch("/user:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    console.log(userID)
    const user = await User.findByIdAndUpdate(userID, req.body);
    await user.save()
    res.send("User updated succesfully");
  } catch (err) {
    res.status(401).send("Update got failed:" + err.message);
  }
});
