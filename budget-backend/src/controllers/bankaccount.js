const BankAccount = require("../models/bankaccount");

module.exports.createBankAccount = async (req, res, next) => {
  const args = {
    person: req.person.person,
    account_number: req.body.account_number,
    balance: req.body.balance,
    currency: req.body.currency,
  };
  try {
    await BankAccount.create(args);
    res.status(200).json({ message: "Bank Account created!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getBankAccounts = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await BankAccount.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getBankAccount = async (req, res, next) => {
  const args = {
    person: req.person.person,
    bankaccount: Number(req.params.id),
  };
  try {
    const { rows } = await BankAccount.fetchById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.validateBankAccount = async (req, res, next) => {
  const args = {
    person: req.person.person,
    account_number: req.body.account_number,
  };
  try {
    const { rows } = await BankAccount.fetchByAccountNumber(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
