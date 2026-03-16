// create server 
//config server

const express= require("express");
const notesModel = require("./models/notes.model");
const { default: mongoose } = require("mongoose");


const app = express();

app.use(express.json());


//now we will create one api through which we can send the 

app.post("/api/notes", async(req,res)=>{
    // we will send the data

    // we will get title and the description
    console.log("this post request is recieved") 

    const {title,description} = req.body;


   const note =await notesModel.create({
        title,
        description,

   })

   // the notes has been created now 

   res.status(201).json({
    message : "Notes has been created",
    note,
    
   })
});

// now we will create one more route in the given backend


app.get("/api/notes",async (req,res)=>{
     // here we will send all the data stored in the monogdb to the server 

     // we will return the object stored in the mongodb to the server
     const notes =await notesModel.find();//this find method alway return the array of objects    

     // now it will return all the data stored in the database

     res.status(200).json({
          message: "the messsage recieved",
          notes,
     })

     
})

// now we will create one api where we will delete notes

app.delete("/api/notes/:id",async (req,res)=>{

      // here we will get the id in the params
     // we will pass the notes id in the params and will delete the id 
     const id = req.params.id;
     console.log(id);
     const notes =await notesModel.findByIdAndDelete(id); //this we will return the object which was deleted

      res.status(200).json({
     //here we will delete the notes
     message:"notes deleted successfully",
     notes,
     })

     

})

//next we will create on more api in which we willl update the description of the notes with some id 


app.patch("/api/notes/:id",async (req,res)=>{
     //here we will first get the id 

     const id = req.params.id;

     // here using this method we are going to update the part of the data by getting the index of it


     // now we will select the data element which is present in the mongodb then we will update it with the new description 
     // here we can replace the given notes data with the new one
     // : we will use the replace one fuction to repalce it
     
     const description  = req.body.description;
     const notes =await notesModel.findByIdAndUpdate(id,
          // here we have passed the id first now we will change the content of the given id
          {
               description : description
          }
     )

     res.status(200).json({
          // we will send that the updation has been successfully donne
          message :"the updation is done "
     });


     // this will be updated
     
})

    



module.exports = app; 