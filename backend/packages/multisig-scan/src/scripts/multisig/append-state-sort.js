require("dotenv").config();

const {
  multisig: { getMultisigCol },
} = require("@statescan/mongo");
const {
  consts: { MultisigStateType },
} = require("@statescan/common");

function getSortValue(stateName) {
  if (MultisigStateType.Approving === stateName) {
    return 1;
  } else if (
    [MultisigStateType.Executed, MultisigStateType.Cancelled].includes(
      stateName,
    )
  ) {
    return 2;
  }

  throw new Error(`Unknown multisig state name: ${stateName}`);
}

async function queryMultisigs() {
  const col = await getMultisigCol();
  return await col
    .find({ "state.sortValue": { $exists: false } }, { projection: { _id: 0 } })
    .limit(50)
    .toArray();
}

async function batchAppendSortValue(multisigs) {
  const col = await getMultisigCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const multisig of multisigs) {
    const { id, state } = multisig;
    const sortValue = getSortValue(state.name);
    bulk.find({ id }).update({ $set: { "state.sortValue": sortValue } });
  }

  await bulk.execute();
}

(async () => {
  let sum = 0;
  let multisigs = await queryMultisigs();
  while (multisigs.length > 0) {
    await batchAppendSortValue(multisigs);
    console.log(`Append sort value to ${multisigs.length} multisigs`);
    sum += multisigs.length;
    multisigs = await queryMultisigs();
  }

  console.log(`Total append ${sum} multisigs`);
  process.exit(0);
})();
