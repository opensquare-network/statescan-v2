const { prisma } = require("backend/packages/postgres-block-scan");

async function insertBlockToPg(block, extrinsics) {
  const {
    height,
    hash,
    time: timestamp,
    validator,
    eventsCount,
    extrinsicsCount,
  } = block;

  const normalizedExtrinsics = (extrinsics || []).map((extrinsic) => {
    const { indexer, section, method, args, eventsCount } = extrinsic;
    return {
      height: indexer.blockHeight,
      index: indexer.extrinsicIndex,
      isSigned: extrinsic.isSigned,
      signer: extrinsic.signer,
      section,
      method,
      args,
      eventsCount,
      isSuccess: extrinsic.isSuccess,
    };
  });

  await prisma.block.create({
    data: {
      height,
      hash,
      time: new Date(timestamp),
      validator,
      eventsCount,
      extrinsicsCount,
    },
  });

  for (const extrinsic of normalizedExtrinsics) {
    await prisma.extrinsic.create({ data: extrinsic });
  }
}

module.exports = {
  insertBlockToPg,
};
