const {
  chain: { decodeExtrinsic },
} = require("@osn/scan-common");

/**
 * `api.rpc.chain.getBlock` decodes the whole block in one go and throws as soon as a
 * single extrinsic can not be decoded, which a general transaction (extrinsic format v5)
 * makes it do. Fetch the raw block and decode it ourselves, one extrinsic at a time.
 */
async function getBlock(api, blockHash) {
  const registry = (await api.at(blockHash)).registry;
  const rawBlock = await api._rpcCore.provider.send("chain_getBlock", [
    blockHash.toHex(),
  ]);
  if (!rawBlock || !rawBlock.block) {
    throw new Error(`Can not get the raw block ${blockHash.toHex()}`);
  }

  const header = registry.createType("Header", rawBlock.block.header);
  const extrinsics = (rawBlock.block.extrinsics || []).map((extrinsic) =>
    decodeExtrinsic(registry, extrinsic),
  );

  return registry.createType("SignedBlock", {
    block: registry.createType("Block", { header, extrinsics }),
    justifications: rawBlock.block.justifications ?? null,
  });
}

async function getBlockData(api, blockHeightOrHash) {
  try {
    let blockHash;
    if (
      typeof blockHeightOrHash === "number" ||
      blockHeightOrHash.match(/^\d+$/)
    ) {
      blockHash = await api.rpc.chain.getBlockHash(blockHeightOrHash);
    } else {
      blockHash = blockHeightOrHash;
    }

    const [block, events, validators] = await Promise.all([
      getBlock(api, blockHash),
      api.query.system.events.at(blockHash),
      api.query.session?.validators
        ? api.query.session.validators.at(blockHash).catch(() => null)
        : null,
    ]);

    return {
      block,
      events,
      validators,
    };
  } catch (e) {
    return null;
  }
}

module.exports = { getBlockData };
