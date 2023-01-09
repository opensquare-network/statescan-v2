const { isCid } = require("../../../ipfs/utils/isCid");
const { extractCid } = require("../../../ipfs/utils/extractCid");

(async () => {
  // console.log(await isCid("QmeXMHxaaWRAUPAFa9KAuDLmf4w3kSYyWwjw6aDjtKncnW"));

  console.log(extractCid("QmeXMHxaaWRAUPAFa9KAuDLmf4w3kSYyWwjw6aDjtKncnW"));
})();
