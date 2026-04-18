const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username : {
        type:String,
        unique: [true,"username already exists"],
        required :[true,"user name is required"]
    },
    email:{
        type:  String, 
        unique:[true,"email already exists"],
        required:[true,"user name is required"]
    },
    password : {
        type:String,
        required:[true,"password is required"]
    },

    bio:String,

    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/a3xezcksqj/default%20user.jfif"
    }



})


// now we will create one model 

const userModel = mongoose.model("users",userSchema);

// now we will create one model and we will export to 

module.exports = userModel;





