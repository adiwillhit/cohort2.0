const express = require("express");
const userController = require("../controllers/user.controller")
const identifyUser =require("../middlewares/auth.middleware")

const userRouter  = express.Router();

// we are creating this route to follow the parmeter userid 
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

module.exports =userRouter;