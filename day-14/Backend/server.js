require("dotenv").config();
const app = require("./src/app");
const connecttoDB = require("./src/config/database")

connecttoDB(); 

app.listen(3000,()=>{
    //now we will call the call back
    console.log("server is running on port 3000");
})

