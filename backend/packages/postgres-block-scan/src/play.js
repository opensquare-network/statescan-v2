require("dotenv").config();

const { getNextScanHeight } = require("./postgres/nextHeight");

(async () => {
  const height = await getNextScanHeight();
  console.log(height);
})();
