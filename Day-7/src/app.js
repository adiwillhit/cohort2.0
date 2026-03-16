// here we will create the server and config the server
const express = require("express");
const noteModel = require("./models/notes.model");


const app = express();

// lets create one middlewart 

app.use(express.json());// here we have create one middle ware to read the json file

// now lets create some api


app.post("/notes",async (req,res)=>{
    //now we will destructure the data

    const {title ,description }= req.body

    // now we will create the notes 

    const note = await noteModel.create({
        title ,
        description,
    })

    // after the notes is created we will send the status code to the server

    res.status(201).json({
        message : "notes created successfully ",
        note
    })
    
})

// now we will create one more route to get the data from the backend

app.get("/notes", async(req,res)=>{

    const note = await  noteModel.find(); // this will reutrn an array which will have objects 

    res.status(200).json({
        message: "notes recieved successfully ",
        note
    })
})






// now we will export the given server 

module.exports =app; 