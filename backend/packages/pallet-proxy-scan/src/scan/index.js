const {
  palletRecovery: { getRecoveryDb },
  palletProxy: { getProxyDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("./delete");

async function scan() {
  const db = await getRecoveryDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);
}
