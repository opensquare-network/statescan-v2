const {
  chain: { decodeExtrinsic },
} = require("@osn/scan-common");

/**
 * `api.rpc.chain.getBlock` decodes the whole block in one go and throws as soon as a
 * single extrinsic can not be decoded, which a general transaction (extrinsic format v5)
 * makes it do. Fetch the raw block instead and decode it ourselves, one extrinsic at a time.
 *
 * The block api of the very block (`api.at(blockHash)`) has to be passed in: its registry
 * holds the metadata of the runtime the block was produced with, which tells the
 * transaction extension version a general transaction was encoded with.
 */
async function fetchBlock(api, blockApi, blockHash) {
  const rawBlock = await api.rpc.chain.getBlock.raw(blockHash);
  if (!rawBlock || !rawBlock.block) {
    throw new Error(`Can not get the raw block ${blockHash.toHex()}`);
  }

  const registry = blockApi.registry;
  const header = registry.createType("Header", rawBlock.block.header);
  const extrinsics = (rawBlock.block.extrinsics || []).map((extrinsic) =>
    decodeExtrinsic(registry, extrinsic),
  );

  return registry.createType("Block", { header, extrinsics });
}

module.exports = {
  fetchBlock,
};
