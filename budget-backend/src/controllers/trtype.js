const TrType = require("../models/trtype");

module.exports.getTransactionTypes = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await TrType.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
