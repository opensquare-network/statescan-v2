require("dotenv").config();
const { syncParsedData } = require("../../ipfs/metadata/sync");

(async () => {
  await syncParsedData();
})();
