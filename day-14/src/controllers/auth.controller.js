const userModel =require("../models/user.model");
const jwt  = require("jsonwebtoken");
// const crypto  = require("crypto")
const bcrypt = require("bcryptjs");
// we will use bcrypt instead of crypto 
//for high security



async function  registercontroller (req,res){
    const {username ,email , password,bio ,profile_image}= req.body;


    // // we iwll check if user already exists
    // const isUserExistsByEmail = await userModel.findOne({email});
    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message: "user already exists"
    //     });
    // }
    
    // const isUserExistsByUsername = await userModel.findOne({username});

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"username already exists"
    //     })
    // }

    //more efficient way:
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists" + isUserAlreadyExists.email==email ?"email already exists" : "username already exists "
        })
    }
    // now we will save this user data in the database
    // const hash = crypto.createHash('sha256').update(password).digest('hex');

    // use of bcrypt
    const hash =await  bcrypt.hash(password,10);
    
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profile_image

        

    });

    //after the user is created we will give the token to it 

    const token = jwt.sign({
        // here 
        // user of data and data is unique
        id: user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            email:user.email,
            username: user.username,
            bio : user.bio,
            profileImage:user.profileImage

        }

    })
}

async function logincontroller(req,res){
    const {username ,email,  password}= req.body;

    // now we will check if the email or the username exists 

    const isUserExists = await userModel.findOne({
        $or:[
            {email},
            {username},
        ]
    })

    if(!isUserExists){
        return res.status(404).json({
            message:"user not exists" + isUserExists.email==email ? "username not exists" : "email not exists"
        })
    }

    else{
        // this means valid email and username 
        // we will chekc for the password
        // const hash = crypto.createHash("sha256").update(password).digest('hex');

        // now we will compare 
        const isPasswordValid = await bcrypt.compare(password,isUserExists.password);
        if(isPasswordValid){
            //this means valid 
            
            // we will provide a new token to it
            const token = jwt.sign({

               id: isUserExists._id
            },process.env.JWT_SECRET);

            res.cookie("token",token,{expiresIn:"1d"});
            res.status(200).json({
                message:"user logined successfully",
                user:{
                    username: isUserExists.username,
                    email:isUserExists.email,
                    bio:isUserExists.bio,
                    profileImage:isUserExists.profileImage
                }

            })
        
        }
        else{
            res.status(401).json({
                message:"username password doesnot match"
            })
        }
    }

}

module.exports = {
    registercontroller,
    logincontroller
}