const express = require("express")
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")



postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController);
//if we want to store the multiple image we will use upload.array[] instead of upoead.single
// now we will create one more route to get all the post

postRouter.get("/",identifyUser,postController.getPostController)


// now we will create one api which will give the details about the specific post with it's  id and only return  if the specific post belong to that id 

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)




module.exports = postRouter

