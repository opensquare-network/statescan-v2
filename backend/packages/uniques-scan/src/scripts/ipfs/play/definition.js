require("dotenv").config();

const {
  uniques: { getMetadataCol },
} = require("@statescan/mongo");
const { parseOneDefinition } = require("../../../ipfs/metadata/definition");

const hash = "42a8bfc2217fb41d5bb60cd8ea121763";

(async () => {
  const col = await getMetadataCol();
  let item = await col.findOne({ hash });
  if (!item) {
    console.error(`Not find metadata for hash: ${hash}`);
  }
  await parseOneDefinition(item.hash, item.data);
  process.exit(0);
})();
