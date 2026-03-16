const mongoose = require("mongoose");


// now we have to connnect the server to the mongodb server 
// for that we will use the mongoose to connect 

//here we will create on function in which we are going to start the server

function connecttodb(){
    
    mongoose.connect(process.env.MONGO_URI)//the uri we get is of the cluseter // for uri of the database we need to add the database name say day-5 
    .then(()=>{
        //we will console that the given server has been started 
        console.log("connected to db");
    })// .then is used to send the respose that the server has started successfully
}

// now we will export the connecttodb

module.exports = connecttodb;