const {
  chain: { getApi },
} = require("@osn/scan-common");
const { stringCamelCase } = require("@polkadot/util");

async function queryMetadata(blockHeight) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const metadata = await api.rpc.state.getMetadata(blockHash);
  return metadata.asLatest.toJSON();
}

async function queryMetadataByBlockHash(blockHash) {
  const api = await getApi();
  const metadata = await api.rpc.state.getMetadata(blockHash);
  return metadata.asLatest.toJSON();
}

function getMetadataSectionCalls(section, metadataJson) {
  const { lookup: { types } = {}, pallets = [] } = metadataJson;
  const pallet = pallets.find((p) => p.name === section);
  if (!pallet) {
    return null;
  }

  const { calls } = pallet;
  const type = types[calls.type];
  return type.type.def?.variant?.variants?.map((call) =>
    stringCamelCase(call.name),
  );
}

module.exports = {
  queryMetadata,
  queryMetadataByBlockHash,
  getMetadataSectionCalls,
};
