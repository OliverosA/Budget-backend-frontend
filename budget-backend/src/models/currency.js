const { pool } = require("../utils/db");

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_CURRENCIES = `SELECT 
                                    c.CURRENCY AS "currency", 
                                    c.SYMBOL AS "symbol", 
                                    c.ACRONYM AS "acronym" 
                                    FROM CURRENCY c, PERSON p
                                    WHERE p.PERSON = :person`;
  return pool(SQL_SELECT_CURRENCIES, bindings);
};

module.exports.fetchAccountCurrency = ({ person, currency }) => {
  const bindings = { person, currency };
  const SQL_SELECT_ACCOUNTCURRENCY = `SELECT 
                                        c.CURRENCY AS "currency", 
                                        c.SYMBOL AS "symbol", 
                                        c.ACRONYM AS "acronym"
                                        FROM CURRENCY c, Person p  
                                        WHERE c.CURRENCY = :currency;
                                        AND p.PERSON = :person`;
  return pool(SQL_SELECT_ACCOUNTCURRENCY, bindings);
};
