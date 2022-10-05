const { pool } = require("../utils/db");

module.exports.create = ({ person, account_number, balance, currency }) => {
  const bindings = { person, account_number, balance, currency };
  const SQL_INSERT_BANKACCOUNT = `INSERT INTO BANKACCOUNT (BANKACCOUNT, ACCOUNT_NUMBER, BALANCE, PERSON, CURRENCY)
                               VALUES(SQ_BANKACCOUNT.NEXTVAL, :account_number, :balance, :person, :currency)`;
  return pool(SQL_INSERT_BANKACCOUNT, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_BANKACCOUNTS = `SELECT 
                                    BANKACCOUNT AS "bankaccount", 
                                    ACCOUNT_NUMBER AS "account_number", 
                                    BALANCE AS "balance",
                                    CURRENCY AS "currency", 
                                    TO_CHAR(ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                    FROM BANKACCOUNT
                                    WHERE PERSON = :person
                                    ORDER BY BANKACCOUNT`;
  return pool(SQL_SELECT_BANKACCOUNTS, bindings);
};

module.exports.fetchById = ({ person, bankaccount }) => {
  const bindings = { person, bankaccount };
  const SQL_SELECT_BANKACCOUNT = `SELECT
                                BANKACCOUNT AS "bankaccount", 
                                ACCOUNT_NUMBER AS "account_number", 
                                BALANCE AS "balance",
                                CURRENCY as "currency", 
                                TO_CHAR(ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                FROM BANKACCOUNT
                                WHERE PERSON = :person
                                AND BANKACCOUNT = :bankaccount`;
  return pool(SQL_SELECT_BANKACCOUNT, bindings);
};

module.exports.fetchByAccountNumber = ({ person, account_number }) => {
  const bindings = { person, account_number };
  const SQL_GET_BANKACCOUNT = `SELECT 
                              b.BANKACCOUNT AS "bankaccount", 
                              b.ACCOUNT_NUMBER AS "account_number", 
                              b.BALANCE AS "balance",
                              b.CURRENCY as "currency", 
                              TO_CHAR(b.ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                              FROM BANKACCOUNT b, PERSON p
                              WHERE b.ACCOUNT_NUMBER = :account_number
                              AND p.PERSON  = :person`;
  return pool(SQL_GET_BANKACCOUNT, bindings);
};
