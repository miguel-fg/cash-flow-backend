const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//login user
const login_user = asyncHandler(async (req, res) => {
    res.json({ mssg: "login user" });
});

//signup user
const signup_user = asyncHandler(async (req, res) => {
    res.json({ mssg: "signup user" });
});

module.exports = { login_user, signup_user };
