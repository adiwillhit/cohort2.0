const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter);//note the api/auth is the prefix it can be any 


module.exports = app;