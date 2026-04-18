const express = require("express");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// but to use router we need to import it in the app.js

authRouter.post("/register", async (req, res) => {
  // here we need user model to create a user

  //we will get the user info in the req.body
  /// lets destruture it

  const { name, email, password } = req.body;
  // now here we will store the password in the form of hash
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  // now we will first chekc if the email alredy exist
  if (await userModel.findOne({ email })) {
    //we will return that the user already exists

    return res.status(409).json({
      message: "user already exists",
    });
  }

  //other wise we will create the new user here

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  // now we wiil createe token and we will send to user and save the token in the cookie

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  ); // here we will pass the unique user id and the jwt secret

  // now we will set the cookie in the client cookie

  res.cookie("token", token); // key  value pair is set

  // now after the createoin of the user now we iwll send the succefull

  res.status(201).json({
    message: "the user create successfully",

    // we will also send the data to them
    user: {
      name,
      email,
    },
  });
});

// now we will create one more route for the getting the info

authRouter.get("/get-me", async (req, res) => {
  //first we will take there token
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // now we will find the user with that user id

  const user = await userModel.findById(decoded.id);

  //now we will return the data of the user
  if (user) {
    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(409).json({
      message: "invalid token",
    });
  }
});

// now if the user want to create the token again then we will create one route for login

authRouter.post("/login", async (req, res) => {
  // now here we will first check if the user pass is correct

  const { email, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.findOne({ email });

  if (user) {
    // then we will create one token

    const isvalid = hash === user.password;

    if (!isvalid) {
      return res.status(404).json({
        message: "invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    //and we will set this token in the cookies
    res.cookie("token", token);

    res.status(201).json({
        message:"Login created"
    })
  }
});

module.exports = authRouter;
