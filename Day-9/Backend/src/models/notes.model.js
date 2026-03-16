// now here we need to create on schema

const mongoose = require("mongoose")


const notesSchema = new mongoose.Schema({
    title:String ,
    description :String,
})


//now we will create one model for this 

const notesModel = new mongoose.model("notes", notesSchema);


// now we will export this notes model as the curd opretiaon are done using this


module.exports= notesModel