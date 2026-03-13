const express = require("express");

const app = express();

// we will create one middle ware // this we will help to read the JSON data

app.use(express.json());// mandatory to read the data coming from client to server



/// now here we going to take one array which will store the individual objects which will sotre the notes in it 

// notes data format 

// {
    //     title: "test title1",
    //     description : "test description 1"
    // },

    // {
    //     title:"test title2",
    //     description: "test description 2"
    // }
const notes = []


/// now we will create one api end point at which we will create one api which will take request
//here we will use post api -- because we need to create new data on server side 

app.post("/notes",(req,res)=>{
    // now we have create the data in the json format using the post method
    // now we will access the whole data of the frontend with the req keyword 
    // all the data coming from the frontend can be accessed from the req

    console.log(req.body);// as we have sent the data in the body from the post man

    notes.push(req.body);


    //now to see the notes created on server for that we need create one more api
    // the name of api can be same 
    app.get("/notes",(req,res)=>{
        res.send(notes);
    })





    // res // this means send the data from server to the client or frontend
    res.send("notes has been created");

})

app.listen(3000, ()=>{
    // this is the callback which we will give to notify the server is ready to take the request
    console.log("the server started at 3000 port");
});
