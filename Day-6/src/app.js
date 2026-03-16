// create the server
//config the server 

const express = require("express");

// here we will requiere the express package 

const app = express();

app.use(express.json());

const notes=[];

app.get("/notes",(req,res)=>{
    notes
    res.status(200).json({
        message:"done",
        notes,
    })
})

app.post("/notes",(req,res)=>{

    const {title , description} = req.body;
    console.log(notes);
    
console.log();

    notes.push(req.body);
    console.log(notes);
    
    res.status(201).json({
        message:"done"
    })
})



// now we will export teh createad server 
module.exports =app;