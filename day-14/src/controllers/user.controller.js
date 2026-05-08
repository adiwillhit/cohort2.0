
const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");



async function followUserController(req,res) {

    // now we will call all the function which are required 
    const followerUsername = req.user.username;//this is to access which user has sent the request 

    const followeeUsername = req.params.username; //to whom we want to follow 


    

    // we will also handle if the follower and followee are same we will send some error in response

    if(followerUsername== followeeUsername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }

    // we will also check the user req to follow does it exists

    const isFolloweeExists = await userModel.findOne({username: followeeUsername});

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"user you are trying to follow, does'nt exsist "
        })
    }

    //we will also check if the already there is a record created in the database we will not create a new 

    const isAlreadyFollowing = await followModel.findOne({follower:followerUsername  ,followee:followeeUsername});

    if(isAlreadyFollowing){
        // we will send that the user already exists with this 
        return res.status(200).json({
            message:`you already follow ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }


    // we will find the one to whome ones need to follow 
    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    
    });

    res.status(201).json({
        message:`You are now following ${followeeUsername}`,
        follow: followRecord
    })
}


// now we will create one controller to unfollow the user

async function unfollowUserController(req,res) {


    // we will have the folllwer and the followee 

    // we  will verify if the  followee exists

    // and if the follwer follow the followeee or not 
    //if follow we will remove the entry from the database 
    
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;


    const ifFolloweeExists = await userModel.findOne({username:followeeUsername});

    if(!ifFolloweeExists){
        return res.status(404).json({
            message:"user doesnt exits to follow"
        })
    }

    const ifUserFollow = await followModel.findOne({follower : followerUsername , followee : followeeUsername});

    if(!ifUserFollow){
        return res.status(404).json({
            message:`you dont follow user ${followeeUsername}`
        })
    }

    // now this means user follow we will remove the entry 

    const removedFollowee = await followModel.deleteOne({follower:followerUsername ,followee:followeeUsername});

    return res.status(200).json({
        message:`you unfollwed ${followeeUsername} `
    })
    
}
module.exports  ={
    followUserController,
    unfollowUserController
}





