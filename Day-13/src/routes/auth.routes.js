const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

// if we want to create routes in other than app.js then we will use the express.router() 
const authRouter = express.Router();

const crypto = require("crypto")


authRouter.post("/register",async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists with thsi email addresss",
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name: name,
        email,
        password:hash,
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


authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);
    

    res.status(200).json({
        message:"this is protected route"
    })
})


// the callback which are called after the callback are called as the controller 

authRouter.post("/login",async (req,res)=>{
    const {email ,password} =req.body

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message: "user not found  with this email address" 
        })
    }

    // other wise we iwll chekc the password

    const ispasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex"); 

    if(!ispasswordMatched){
        // if the passsword is not matched then we will return the 
        return res.status(401).json({
            message: "Invalid password "
        })
        // we will send this pass word was an invalid password 
    }

    //if the password is matched then we will assign a new token to it 

    const token = jwt.sign({
        id:user._id,
        email
    },process.env.JWT_SECRET);

    //now as soon as the user create we will set the token as the new token

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in",
        user,
    })
})


module.exports =authRouter