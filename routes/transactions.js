const express = require('express');
const transactionsLogic = require('../logic/transactionsLogic');
const router = express.Router();


router.get("/transactions", transactionsLogic.getAllTransactions);

router.put("/addFunds", transactionsLogic.addFunds);

router.put("/spendFunds", transactionsLogic.spendFunds);

module.exports = router;