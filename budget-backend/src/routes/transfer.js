const express = require("express");
const router = express.Router();
const guard = require("../guard/guard");

const { createTransfer } = require("../controllers/transfer");

router.post("/transfer", guard, createTransfer);

module.exports = router;
