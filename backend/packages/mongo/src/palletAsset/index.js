const db = require("./db");

module.exports = {
  ...db,
  ...require("./getAsset"),
  ...require("./insertAssetTimeline"),
  ...require("./updateAsset"),
};
