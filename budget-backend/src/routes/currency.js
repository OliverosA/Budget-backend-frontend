const express = require("express");
const router = express.Router();
const guard = require("../guard/guard");

const {
  getCurrencies,
  getAccountCurrency,
} = require("../controllers/currency");

router.get("/currency", guard, getCurrencies);
router.get("/currency/:id", guard, getAccountCurrency);

module.exports = router;
