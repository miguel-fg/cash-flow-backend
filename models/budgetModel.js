const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user_id: { type: String, required: true },
    balance: { type: Number, required: true }
});

module.exports = mongoose.model("Budget", budgetSchema);