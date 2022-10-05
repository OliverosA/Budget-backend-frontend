const Transfer = require("../models/transfer");

module.exports.createTransfer = async (req, res, next) => {
  const args = {
    person: req.person.person,
    amount: req.body.amount,
    description: req.body.description,
    orig_account: req.body.orig_account,
    dest_account: req.body.dest_account,
  };
  try {
    await Transfer.create(args);
    res.status(200).json({ message: "Transfer created!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
