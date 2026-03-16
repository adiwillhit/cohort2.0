// here we will start the server

require("dotenv").config()
const app = require("./src/app");

const connecttodb = require("./src/config/database")

connecttodb();


//now we will start the server 

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})