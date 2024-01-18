const express = require("express");

//controller

const {
    get_budget,
    set_budget,
    update_budget
} = require("../controllers/budgetController");

//middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth); // fires authentication before any of the budget functions

// routes

// GET budget
router.get("/", get_budget);

// POST new budget
router.post("/", set_budget);

// UPDATE budget
router.patch("/", update_budget);

module.exports = router;