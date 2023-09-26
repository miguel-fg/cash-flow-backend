const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//login user
const login_user = asyncHandler(async (req, res) => {
    res.json({ mssg: "login user" });
});

//signup user
const signup_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        res.status(200).json({email, user});
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports = { login_user, signup_user };
