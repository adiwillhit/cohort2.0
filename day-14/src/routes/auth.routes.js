const express = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();






// now we will create routes here 

authRouter.post("/register",authController.registercontroller)

// now we will create one login route

authRouter.post("/login",authController.logincontroller)


module.exports= authRouter;



