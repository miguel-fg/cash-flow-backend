const express = require("express");
const router = express.Router();

// controller
const { login_user, signup_user } = require("../controllers/userController");

// login
router.post("/login", login_user);

// signup
router.post("/signup", signup_user);

module.exports = router;
