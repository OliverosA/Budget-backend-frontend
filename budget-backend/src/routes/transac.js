const express = require("express");
const router = express.Router();
const guard = require("../guard/guard");

const {
  createIncomeTransac,
  createExpenseTransac,
  getTransactions,
  getAccountTransactions,
  getIncomeSummary,
  getExpenseSummary,
} = require("../controllers/transac");

router.post("/incomeTransaction", guard, createIncomeTransac);
router.post("/expenseTransaction", guard, createExpenseTransac);
router.get("/transaction", guard, getTransactions);
router.get("/transaction/:id", guard, getAccountTransactions);
router.post("/trasaction/incomeSummary", guard, getIncomeSummary);
router.post("/trasaction/expenseSummary", guard, getExpenseSummary);

module.exports = router;
