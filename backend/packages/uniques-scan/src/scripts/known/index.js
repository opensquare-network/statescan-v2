require("dotenv").config();
const { saveInstanceKnownHeights } = require("./instance");
const { saveClassKnownHeights } = require("./class");

(async () => {
  await saveClassKnownHeights();
  await saveInstanceKnownHeights();
  process.exit(0);
})();
