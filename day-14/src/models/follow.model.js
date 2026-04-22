const mongoose = require("mongoose");

// NOTE: we donot make the follow property inside the schema of the user 
// we create new Schema for the follower and followee proprerty 
// NOTE: in realworld : read and write operation is more expensive than the storage


const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "Follower is required"],

    },

    followee: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required :[true, "Followee is required"],
    }
},{
    timestamps:true,
})

const followModel = mongoose.model("follows".followSchema);

module.exports = followModel;