const { pool } = require("../utils/db");

module.exports.create = ({
  person,
  amount,
  description,
  orig_account,
  dest_account,
}) => {
  const bindings = {
    person,
    amount,
    description,
    orig_account,
    dest_account,
  };

  const SQL_INSERT_TRANSFER = `BEGIN
                                    EXECUTE_TRANSFERS (
                                        :person,
                                        SQ_TRANSFER.NEXTVAL,
                                        :amount,
                                        :description,
                                        :orig_account,
                                        :dest_account
                                    );
                                END;`;
  return pool(SQL_INSERT_TRANSFER, bindings, { autoCommit: true });
};
