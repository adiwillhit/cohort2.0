//to start server 

//here lets requiere he app 
const app = require("./src/app");
const mongoose = require("mongoose");

// now here we will create one function to conneect the monogodb database to the server

function connectotdb(){
    mongoose.connect(process.env.MONGO_URI)// /day-6 : if exsits then use it otherwise use it 
    .then(()=>{
        console.log("connected to db");
        
    });
}

// now we will call the create function 

connectotdb();

// now we will start the given server 

app.listen(3000,()=>{
    console.log("server started at port 3000");
    
})
