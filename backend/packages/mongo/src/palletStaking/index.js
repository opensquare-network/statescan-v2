const db = require("./db");

module.exports = {
  ...db,
  ...require("./reward"),
};
