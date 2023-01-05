const { isMetadataConfigIpfs } = require("../../../ipfs/metadata/onchain");
const { isCid } = require("../../../ipfs/utils/isCid");

(async () => {
  console.log(await isCid("QmeXMHxaaWRAUPAFa9KAuDLmf4w3kSYyWwjw6aDjtKncnW"));
  console.log(
    await isMetadataConfigIpfs({
      data: "0x516d5a397138707551576a6d417279547072394547367744445737584a464c727644327432626273367567394848",
    }),
  );
})();
