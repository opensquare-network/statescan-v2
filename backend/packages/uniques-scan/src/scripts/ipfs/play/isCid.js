const { isCid } = require("../../../ipfs/utils/isCid");

(async () => {
  console.log(await isCid("QmeXMHxaaWRAUPAFa9KAuDLmf4w3kSYyWwjw6aDjtKncnW"));
})();
