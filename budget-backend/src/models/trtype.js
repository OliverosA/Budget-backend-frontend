const { pool } = require("../utils/db");

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_GET_TRTYPES = `SELECT 
                            TRTYPE AS "trtype",
                            NAME AS "name",
                            DESCRIPTION AS "description"
                            FROM TRTYPE, PERSON
                            WHERE PERSON = :person`;
  return pool(SQL_GET_TRTYPES, bindings);
};
