const { pool } = require("../utils/db");

module.exports.create = ({ person, name, description }) => {
  const bindings = { person, name, description };
  const SQL_INSERT_CATEGORY = `INSERT INTO CATEGORY(CATEGORY, NAME, DESCRIPTION, PERSON)
                               VALUES(SQ_CATEGORY.NEXTVAL, :name, :description, :person)`;
  return pool(SQL_INSERT_CATEGORY, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_CATEGORIES = `SELECT 
                                CATEGORY AS "category", 
                                NAME AS "name", 
                                DESCRIPTION AS "description", 
                                TO_CHAR(ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                FROM CATEGORY
                                WHERE PERSON = :person
                                OR PERSON IS NULL
                                ORDER BY CATEGORY`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
};

module.exports.findById = ({ person, category }) => {
  const bindings = { person, category };
  const SQL_SELECT_CATEGORY = `SELECT 
                                CATEGORY AS "category", 
                                NAME AS "name", 
                                DESCRIPTION AS "description", 
                                TO_CHAR(ADD_DATE, 'YYYY-MM-DD') AS "add_date"
                                FROM CATEGORY
                                WHERE PERSON = :person
                                AND CATEGORY = :category`;
  return pool(SQL_SELECT_CATEGORY, bindings);
};
