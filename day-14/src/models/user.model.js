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
    },

    // Followers features

    //1 id = 12bytes 
    //for aroud 274 million follower we get 32 gb of storeage
    // but the maximum storeage of monogodb that it porvide is 16mb/document // so not possible 
    //solution : edge collection:


    ///HOw do edge collection work here : 
    // the edge collection: Json format structure
    //                      store the data with a relation b/w the documents (userA ,userB... are called documents);


    

    // {
    // _id
    // follwer:user-B 
    // followee: user-A
    // createdAt:Date
// }

    // NOTE: the no of document does not matter but size per documenet does matter
    //


    // therefore  we donot use this type of schema to store the data of the user 
    // followers:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"users", // here we are giving the refference of the user schmea


    // }],
    // //***NOTE:Why are using the [] symbol here //as we know that the pass 
    // following:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"users",
    // }]

    // we will implement this by create one more schema for the follower model

    



})


// now we will create one model 

const userModel = mongoose.model("users",userSchema);

// now we will create one model and we will export to 

module.exports = userModel;





