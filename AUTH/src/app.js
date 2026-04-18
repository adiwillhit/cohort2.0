const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const cookieparser = require("cookie-parser");




app.use(express.json());
app.use(cookieparser());


// now we can create the routes accoringly 
app.use("/api/auth",authRouter);// now the all the auth related api will be here


module.exports= app;