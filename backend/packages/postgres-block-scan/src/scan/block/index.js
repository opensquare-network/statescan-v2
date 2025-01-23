const {
  chain: { getBlockIndexer },
  logger,
  env: { currentChain },
} = require("@osn/scan-common");
const { normalizeBlock } = require("./normalize");
const { prisma } = require("../../db");
const { upsertScanHeight } = require("../../postgres");

async function handleBlock({ block, author, events, height }) {
  let blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  await prisma.block.create({ data: normalizedBlock });

  await upsertScanHeight(height);
}

async function handleBlockIgnoreErrorForChains(arg) {
  if (["westmint"].includes(currentChain())) {
    await handleBlock(arg);
    return;
  }

  try {
    await handleBlock(arg);
  } catch (e) {
    logger.error(`${arg?.height} scan error, but ignore`, e);
  }
}

module.exports = {
  handleBlock,
  handleBlockIgnoreErrorForChains,
};
