const express = require("express");

const app = express();


// now lets 

app.get("/",(req,res)=>{
    // welcome to / api
    res.send("hey there this is / api");
})
app.get("/home",(req,res)=>{
    // welcome to / api
    res.send("this is home route");
})
app.get("/about",(req,res)=>{
    // welcome to / api
    res.send("this is about api");
})


app.listen(3000 ,()=>{
    console.log("server started successfully at port 3000");
});// here we can send one callback function in which
//  we can get confirmation that server is ready to get the request 

