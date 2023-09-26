const express = require("express");
const router = express.Router();

//controller
const {
    get_transactions,
    get_single_transaction,
    create_transaction,
    delete_transaction,
    update_transaction,
} = require("../controllers/transactionController");

// GET all transactions
router.get("/", get_transactions);

//GET a single transaction
router.get("/:id", get_single_transaction);

//POST a new transaction
router.post("/", create_transaction);

//DELETE a single transaction
router.delete("/:id", delete_transaction);

//PATCH a single transaction
router.patch("/:id", update_transaction);

module.exports = router;