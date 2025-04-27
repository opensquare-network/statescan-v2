require("dotenv").config();

const {
  identity: { getRegistrarsCol, getRequestTimelineCol },
} = require("@statescan/mongo");
const { updateRegistrarLastGiven } = require("../../scan/mongo/registrar");

const projection = { projection: { _id: 0 } };

async function getLastGivenIndexer(registrarIndex) {
  const col = await getRequestTimelineCol();
  const arr = await col
    .find({ registrarIndex, name: "JudgementGiven" }, projection)
    .sort({ "indexer.blockHeight": -1 })
    .limit(1)
    .toArray();
  if (arr.length > 0) {
    return arr[0].indexer;
  }

  return arr.length > 0 ? arr[0].indexer : null;
}

(async () => {
  const col = await getRegistrarsCol();
  const registrars = await col.find({}, { projection: { _id: 0 } }).toArray();
  for (const { index } of registrars) {
    const lastGivenIndexer = await getLastGivenIndexer(index);
    console.log(
      `Registrar ${index} last given height: ${lastGivenIndexer?.blockHeight}`,
    );
    if (lastGivenIndexer) {
      await updateRegistrarLastGiven(index, lastGivenIndexer);
    }
  }

  process.exit(0);
})();
