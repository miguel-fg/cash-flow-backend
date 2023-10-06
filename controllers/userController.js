const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//function to generate Tokens for signup and login
const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const login_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create token for the user
        const token = createToken(user._id);

        //sends the token back to the server
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//signup user
const signup_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        //create token for the user
        const token = createToken(user._id);

        //sends the token back to the server
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { login_user, signup_user };
