require("dotenv").config();

const { parseOneResource } = require("../../../ipfs/metadata/resource");
const {
  uniques: { getMetadataCol },
} = require("@statescan/mongo");

const hash = "a67ebbbf3e17aa3054278419dc7fa58b";

async function main() {
  const col = await getMetadataCol();
  let item = await col.findOne({ hash });
  await parseOneResource(item.definition.imageHash, item.definition.image);
}

main().then(console.log);
