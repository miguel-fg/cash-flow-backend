const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// GET all transactions
const get_transactions = asyncHandler(async (req, res, next) => {
    const user_id = req.user;

    // only find transactions registered by the user
    const transactions = await Transaction.find({ user_id })
        .sort({ createdAt: -1 })
        .exec();

    res.status(200).json(transactions);
});

// GET single transaction
const get_single_transaction = asyncHandler(async (req, res, next) => {
    // validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "No such transaction" });
    }

    const transaction = await Transaction.findById(req.params.id).exec();

    if (!transaction) {
        return res.status(404).json({ error: "No such transaction" });
    }

    res.status(200).json(transaction);
});

// CREATE new transaction
const create_transaction = asyncHandler(async (req, res, next) => {
    const user_id = req.user; //user_id is attached by the requireAuth middleware
    const { title, type, amount, category } = req.body;

    const transaction = await Transaction.create({
        user_id,
        title,
        type,
        amount,
        category,
    });

    res.status(200).json(transaction);
});

// DELETE a transaction
const delete_transaction = asyncHandler(async (req, res, next) => {
    // validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "No such transaction" });
    }

    const transaction = await Transaction.findOneAndDelete({
        _id: req.params.id,
    });

    if (!transaction) {
        return res.status(404).json({ error: "No such transaction" });
    }

    res.status(200).json(transaction);
});

// UPDATE a transaction
const update_transaction = asyncHandler(async (req, res, next) => {
    // validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "No such transaction" });
    }

    const transaction = await Transaction.findByIdAndUpdate(
        { _id: req.params.id },
        {
            ...req.body,
        }
    );

    if (!transaction) {
        return res.status(404).json({ error: "No such transaction" });
    }

    res.status(200).json(transaction);
});

module.exports = {
    get_transactions,
    get_single_transaction,
    create_transaction,
    delete_transaction,
    update_transaction,
};
