const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter");
const connectionRouter = require("./routes/connectionRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter)
app.use('/', userRouter)
app.use('/', connectionRouter)

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});





