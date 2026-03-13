const express = require("express"); // 

// express(); // here we have called the express // this will create one server here

// now we need to start the server // that is done using the calling the variable

const app  = express(); // here server instance get created

// here we will program what needs to be shown when the client requeset 

app.get('/',(req,res)=>{
    res.send("hello frontend this this is backend");
})


// now we will start the server

app.listen(3000); // this is the port where the server has started 

