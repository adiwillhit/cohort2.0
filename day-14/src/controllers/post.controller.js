const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    
    const decoded  = req.user.id;
    const file = await imagekit.files.upload({
        file:await  toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder:"cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

    
}


async function getPostController(req,res) {
    const token = req.cookies.token;

    // here if token is valid then decoded store all the info stored in token
    //else : throw error
    
    const userId = req.user.id;
    

    const posts = await postModel.find({
        user: userId
    })


    res.status(200).json({
        message:"Posts fetched succesfully",
        posts
    })


    
}


async function getPostDetailsController(req,res){

    // first we wil take the token from the cookie to find which user it is

   
    // now we will check if the token is valid 
    //then we will send the all post details to the user : with the post related to its id 
    
    const userId = req.user.id;

    const postId = req.params.postId
    // now we need to return the detalis about the specific post 
    // which is related to the user 

    const post = await postModel.findById(postId);

    // now we will find the post related to that user

    if(!post){
        //then we will send the data 


        res.status(404).json({
            message:"no post found related to the user "
        })
        
    }

    // now we will chekc if the post belong to that specific user or not

    const isValiduser = post.user.toString() === userId;

    if(!isValiduser){

        return res.status(403).json({
            message:"Forbidden content",
            
        })
    }

    return res.status(200).json({
        message:"post fetched successfully",
        post,

    })
    
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}
