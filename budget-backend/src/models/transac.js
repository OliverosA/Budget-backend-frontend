const { pool } = require("../utils/db");

module.exports.createIncomeTransaction = ({
  person,
  amount,
  description,
  bankaccount,
  category,
}) => {
  const bindings = {
    person,
    amount,
    description,
    bankaccount,
    category,
  };

  const SQL_INSERT_INCOMETRANSAC = `BEGIN
                                    EXECUTE_INCOME (
                                      :person,
                                      SQ_TRANSAC.NEXTVAL,
                                      :amount,
                                      :description,
                                      :bankaccount,
                                      :category
                                      );
                                    END;`;
  return pool(SQL_INSERT_INCOMETRANSAC, bindings, { autoCommit: true });
};

module.exports.createExpenseTransaction = ({
  person,
  amount,
  description,
  bankaccount,
  category,
}) => {
  const bindings = {
    person,
    amount,
    description,
    bankaccount,
    category,
  };

  const SQL_INSERT_EXPENSETRANSAC = `BEGIN
                                    EXECUTE_EXPENSE (
                                      :person,
                                      SQ_TRANSAC.NEXTVAL,
                                      :amount,
                                      :description,
                                      :bankaccount,
                                      :category
                                      );
                                    END;`;
  return pool(SQL_INSERT_EXPENSETRANSAC, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_TRANSACTIONS = `SELECT
                                    t.TRANSAC AS "transac", 
                                    t.AMOUNT AS "amount",
                                    t.DESCRIPTION AS "description",
                                    t.BANKACCOUNT AS "bankaccount",
                                    t.CATEGORY AS "category",
                                    t.CURRENCY AS "currency",
                                    t.TRTYPE AS "trtype", 
                                    TO_CHAR(t.ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                    FROM TRANSAC t, BANKACCOUNT b
                                    WHERE b.PERSON = :person
                                    AND t.BANKACCOUNT = b.BANKACCOUNT 
                                    ORDER BY b.BANKACCOUNT`;
  return pool(SQL_SELECT_TRANSACTIONS, bindings);
};

module.exports.fetchById = ({ person, bankaccount }) => {
  const bindings = { person, bankaccount };
  const SQL_SELECT_ACCOUNTTRANSCTIONS = `SELECT 
                                          t.TRANSAC AS "transac", 
                                          t.AMOUNT AS "amount",
                                          t.DESCRIPTION AS "description",
                                          t.BANKACCOUNT AS "bankaccount",
                                          t.CATEGORY AS "category",
                                          t.CURRENCY AS "currency",
                                          t.TRTYPE AS "trtype", 
                                          TO_CHAR(t.ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                          FROM TRANSAC t, BANKACCOUNT b
                                          WHERE b.PERSON = :person
                                          AND b.BANKACCOUNT = :bankaccount
                                          AND t.BANKACCOUNT = :bankaccount`;
  return pool(SQL_SELECT_ACCOUNTTRANSCTIONS, bindings);
};

module.exports.getIncomeSum = ({ person, bankaccount }) => {
  const bindings = { person, bankaccount };
  const SQL_SELECT_INCOMESUM = `SELECT DISTINCT 
                                NVL(incomes_summary(:bankaccount, :person), 0) AS "incomes_summary"
                                FROM TRANSAC`;
  return pool(SQL_SELECT_INCOMESUM, bindings);
};

module.exports.getExpenseSum = ({ person, bankaccount }) => {
  const bindings = { person, bankaccount };
  const SQL_SELECT_EXPENSESUM = `SELECT DISTINCT 
                                NVL(expenses_summary(:bankaccount, :person), 0) AS "expenses_summary"
                                FROM TRANSAC`;
  return pool(SQL_SELECT_EXPENSESUM, bindings);
};
