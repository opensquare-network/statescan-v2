async function getBlockData(api, blockHeight) {
  try {
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
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
