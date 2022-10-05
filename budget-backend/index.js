const express = require("express");
const app = express();
const oracle = require("./src/utils/db");
const { server, api } = require("./src/config/config");
const cors = require("cors");

const routes_person = require("./src/routes/person");
const routes_category = require("./src/routes/category");
const routes_bankaccount = require("./src/routes/bankaccount");
const routes_transfer = require("./src/routes/transfer");
const routes_transactions = require("./src/routes/transac");
const routes_trtypes = require("./src/routes/trtype");
const routes_currencies = require("./src/routes/currency");
const routes_invalid = require("./src/routes/404");

//middelware
app.use(cors({ origin: true }));
app.use(express.json());

app.use(api.url, routes_person);
app.use(api.url, routes_category);
app.use(api.url, routes_bankaccount);
app.use(api.url, routes_transactions);
app.use(api.url, routes_transfer);
app.use(api.url, routes_currencies);
app.use(api.url, routes_trtypes);
app.use(api.url, routes_invalid);
app.use(routes_invalid);

oracle
  .start()
  .then(() => {
    console.log("Oracle Database Connected!!!");
    app.listen(server.port, () => {
      console.log(`Server running on port: ${server.port}`);
    });
  })
  .catch((error) => console.log(error));
