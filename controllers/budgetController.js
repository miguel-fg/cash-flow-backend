const Budget = require("../models/budgetModel");
const asyncHandler = require("express-async-handler");

// GET budget
const get_budget = asyncHandler(async (req, res, next) => {
    const user_id = req.user;

    const budget = await Budget.find({ user_id }).exec();

    res.status(200).json(budget);
});

// POST budget
const set_budget = asyncHandler(async (req, res, next) => {
    const user_id = req.user;

    const { balance } = req.body;

    const budget = await Budget.create({
        user_id, 
        balance
    });

    res.status(200).json(budget);
});

// UPDATE budget
const update_budget = asyncHandler(async (req, res, next) => {
     const budget = await Budget.findOneAndUpdate({ user_id: req.user }, {
        ...req.body,
     });

     if(!budget){
        return res.status(404).json({ error: "Could not update balance"});
     }

     res.status(200).json(budget);
});

module.exports = {
    get_budget,
    set_budget,
    update_budget
};