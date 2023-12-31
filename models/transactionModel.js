const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// transaction model
const transactionSchema = new Schema(
    {
        user_id: { type: String, required: true},
        title: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
