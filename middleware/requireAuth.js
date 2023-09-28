const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const requireAuth = asyncHandler(async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: "Authorization token required"});
    }

    const token = authorization.split(" ")[1]; //gets JWT from the request

    //verify the token
    try{
        const {_id} = jwt.verify(token, process.env.SECRET);

        //attach the user property to the request (attaches only _id)
        req.user = await User.findOne({_id}).select("_id");
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error: "Request is not authorized"});
    }
});

module.exports = requireAuth;