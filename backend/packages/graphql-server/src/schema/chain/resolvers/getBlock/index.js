async function getBlockData(api, blockHeightOrHash) {
  try {
    let blockHash;
    if (typeof blockHeightOrHash === "number") {
      blockHash = await api.rpc.chain.getBlockHash(blockHeightOrHash);
    } else {
      blockHash = blockHeightOrHash;
    }

    const [block, events, validators] = await Promise.all([
      api.rpc.chain.getBlock(blockHash),
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
