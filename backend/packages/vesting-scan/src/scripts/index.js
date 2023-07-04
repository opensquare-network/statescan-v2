require("dotenv").config();

const { saveVestingHeights } = require("./vesting");

(async () => {
  await saveVestingHeights();
  process.exit(0);
})();
