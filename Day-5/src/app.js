//server ko create karna 
// server ko config karna 

const express  = require("express");


const app= express();// here we will have called the server config



// now the server we have create we will export it to the server.js

// now we will create one middleware

app.use(express.json());


//now lets createe one notes array which will store the notes in it
notes =[];


// now we will create API here 
app.post("/notes",(req,res)=>{
    //now we will console what we will recive from the client
    notes.push(req.body);
    console.log(req.body);
   
    console.log("this is notes data :");
    console.log(notes);

    // status code  : 201 // new resource created in server side

    res.status(201).json({
        message: "note created successfully"
    }
    );
})

// now lets create one status code 200 

// to send the request
app.get("/notes",(req,res)=>{
    // we will send the notes stored in the notes array 
    res.status(200).json({
        notes:notes
    })
})


// now we will create one route for deletion 

app.delete("/notes/:index",(req,res)=>{
    // now we will delete the array element with index 
   

    // now 
    delete notes[req.params.index];// the index of the params index will be deleted 

    res.status(204).json({
        message : "notes deleted successfully"
    })
})

// now we are going to update the description of the notes

app.patch("/notes/:index",(req,res)=>{
    // now we are going to update the description of the notes at some index

    notes[req.params.index].description = req.body.description;

    res.status(200).json({
        message:"the index description updated successfully"
    })
})



module.exports = app; 