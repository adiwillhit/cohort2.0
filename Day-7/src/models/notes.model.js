// we will create one schema to create what would be inside the notes


const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
    // here we will create one schema where we will define what properties we need in the notes

    title : String,
    description :String,
})

// now we have created one schema now we will create models
// models: these are the collection which store the similar schema data , like notes model , product model

//NOTE : to perform the CURD operation we need to create one model 
const noteModel = new mongoose.model("notes", notesSchema);

// we know that we cannot perform CURD without the model 
// so we will export it

module.exports = noteModel;