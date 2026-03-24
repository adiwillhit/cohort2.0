const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

// if we want to create routes in other than app.js then we will use the express.router() 
const authRouter = express.Router();


authRouter.post("/register",async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists with thsi email addresss",
        })
    }

    const user = await userModel.create({
        name: name,
        email,
        password
    })
    
    const token = jwt.sign({
        id:user._id,
        emil:user.email

    }, process.env.JWT_SECRET)
    
    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})




module.exports =authRouter