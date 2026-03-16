//here we will import the given sever and start it 

//here we will requiere the mongoose package 
const mongoose  = require("mongoose");
const app= require("./src/app");

require("dotenv").config()// this we will intialise all the value in the env  

const connecttodb = require("./src/config/database");

//now we will call start the server and send the callback 



// now we iwll call the connecttodb funciton 
connecttodb();
app.listen(3000,()=>{

    console.log("the server started at port 3000");

})


