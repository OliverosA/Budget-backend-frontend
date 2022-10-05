const Currency = require("../models/currency");

module.exports.getCurrencies = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Currency.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAccountCurrency = async (req, res, next) => {
  const args = {
    person: req.person.person,
    currency: req.body.currency,
  };
  try {
    const { rows } = await Currency.fetchAccountCurrency(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
