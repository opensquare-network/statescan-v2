const db = require("./db");

module.exports = {
  ...db,
  ...require("./proxy"),
  ...require("./announcement"),
};
