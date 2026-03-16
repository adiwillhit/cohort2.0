// now we will import the app.js server 

const app = require("./src/app");// here we have required the server 


app.listen(3000, ()=>{
    console.log("server is running on port no 3000");
})