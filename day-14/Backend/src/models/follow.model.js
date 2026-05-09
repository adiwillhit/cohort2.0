const mongoose = require("mongoose");

// NOTE: we donot make the follow property inside the schema of the user 
// we create new Schema for the follower and followee proprerty 
// NOTE: in realworld : read and write operation is more expensive than the storage


const followSchema = new mongoose.Schema({
    follower:{
        type:String,

    },

    followee: {
        type:String,
    },
    status:{
        type:String,
        defalut:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status can only be pending, accepted or rejected"
        }

    }
},{
    timestamps:true,
})

followSchema.index({follower:1,followee:1},{unique:true})

const followModel = mongoose.model("follows",followSchema);

module.exports = followModel;