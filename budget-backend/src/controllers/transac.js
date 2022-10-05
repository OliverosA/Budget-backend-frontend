const Transac = require("../models/transac");

module.exports.createIncomeTransac = async (req, res, next) => {
  const args = {
    person: req.person.person,
    amount: req.body.amount,
    description: req.body.description,
    bankaccount: req.body.bankaccount,
    category: req.body.category,
  };
  try {
    await Transac.createIncomeTransaction(args);
    res.status(200).json({ message: "Transaction created!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.createExpenseTransac = async (req, res, next) => {
  const args = {
    person: req.person.person,
    amount: req.body.amount,
    description: req.body.description,
    bankaccount: req.body.bankaccount,
    category: req.body.category,
  };
  try {
    await Transac.createExpenseTransaction(args);
    res.status(200).json({ message: "Transaction created!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getTransactions = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Transac.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAccountTransactions = async (req, res, next) => {
  const args = {
    person: req.person.person,
    bankaccount: req.body.bankaccount,
  };
  try {
    const { rows } = await Transac.fetchById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getIncomeSummary = async (req, res, next) => {
  try {
    let args = {};
    const idList = req.body.accounts;
    const result = await Promise.all(
      idList.map(async (id) => {
        args = { person: req.person.person, bankaccount: id };
        const { rows } = await Transac.getIncomeSum(args);
        const { incomes_summary } = await rows[0];
        return Number(incomes_summary.toFixed(2));
      })
    );
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.getExpenseSummary = async (req, res, next) => {
  try {
    let args = {};
    const idList = req.body.accounts;
    const result = await Promise.all(
      idList.map(async (id) => {
        args = { person: req.person.person, bankaccount: id };
        const { rows } = await Transac.getExpenseSum(args);
        const { expenses_summary } = await rows[0];
        return Number(expenses_summary.toFixed(2));
      })
    );
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
