const mongoose = require("mongoose");

// now we will connect the mongoose to the mongoose cluster 


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db");
    })

}

module.exports = connectDB;
