require("dotenv").config();
const app =require("./src/app");
const connectDB = require("./src/config/database");
// we will call the connect to db function 

connectDB();

// now we will start the server 


app.listen(3000,()=>{
    console.log("server is running at port 3000");
})

