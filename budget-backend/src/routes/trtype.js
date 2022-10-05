const express = require("express");
const router = express.Router();
const guard = require("../guard/guard");

const { getTransactionTypes } = require("../controllers/trtype");

router.get("/transactiontypes", guard, getTransactionTypes);

module.exports = router;
