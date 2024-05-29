const db = require("./db");

module.exports = {
  ...db,
  ...require("./getRecoverable"),
  ...require("./update"),
  ...require("./getRecovery"),
};
