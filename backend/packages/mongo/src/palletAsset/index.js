const db = require("./db");

module.exports = {
  ...db,
  ...require("./getAsset"),
  ...require("./insertAssetTimeline"),
  ...require("./insertAssetActivity"),
  ...require("./updateAsset"),
  ...require("./holders"),
  ...require("./approval"),
};
