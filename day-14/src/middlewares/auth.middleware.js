 // to prevent the repetatioin of the code we will add this code middleware 
 const jwt = require("jsonwebtoken")


 async function identifyUser(req,res,next){


    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided ,unauthorized access"
        })
    }

    let decoded =null;

    try{

        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        res.status(401).json({
            message:"user not found"
        })

    } 

    /// we will create one new proprety to store the req.user data 
    req.user = decoded;

    // now we will call the next controller 

    next();
 }

 /// now we will export the function 

 module.exports = identifyUser