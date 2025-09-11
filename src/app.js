const express = require('express')

const app = express()


// app.use('/about', (req,res)=>{
//   res.send("About page is empy")
// })

app.get('/about',(req,res,next)=>{
  console.log("1st Response")
  res.send("Welcome to backend creation")
  next()
},(req,res,next)=>{
  console.log("2nd Response")
  // res.send("Second Response")
  next()
})



app.listen(5000, ()=> {
  console.log("Server started on port 5000")
})