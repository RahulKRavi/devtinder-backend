const express = require("express");

const app = express();

const {adminAuth} = require('./middlewares/auth')

app.use("/admin", adminAuth);

app.get("/admin/getAllData",(req, res) => {
    //User data fetching logic
    res.send("All Data Fetched");
  }
);

app.post("/admin/deleteUser", (req, res) => {
  //User deleting logic
  res.send("User is deleted");
});

app.get('/home',(req,res)=>{
  throw new Error("Bla Bla")
})

app.use('/',(err,req,res,next)=>{
  if(err){
    res.status(404).send("Not Found")
  }
})

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
