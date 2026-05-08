const cookieParser = require("cookie-parser");
const express = require("express");

// Requiring routes : 
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")


const app = express();

//using Routes
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/users",userRouter);


module.exports = app;