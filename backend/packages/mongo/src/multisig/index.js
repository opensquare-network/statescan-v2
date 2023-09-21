module.exports = {
  ...require("./db"),
  ...require("./service/multisig"),
  ...require("./service/timeline"),
  ...require("./service/address"),
};
