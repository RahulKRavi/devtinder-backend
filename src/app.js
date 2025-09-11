const express = require("express");

const app = express();

const {adminAuth} = require('./middlewares/auth')

app.use("/admin", adminAuth);

app.get(
  "/admin/getAllData",
  (req, res) => {
    //User data fetching logic
    res.send("All Data Fetched");
  }
);

app.post("/admin/deleteUser", (req, res) => {
  //User deleting logic
  res.send("User is deleted");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
