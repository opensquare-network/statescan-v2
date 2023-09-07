const { extractAuthor } = require("@polkadot/api-derive/type/util");

function extractBlockTime(block) {
  const setTimeExtrinsic = block.extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set",
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

function extractBlockHeader(header, validators) {
  if (!header) {
    return;
  }

  const { extrinsicsRoot, number, parentHash, stateRoot, hash, digest } =
    header;
  const author = extractAuthor(digest, validators);

  return {
    height: number.toNumber(),
    hash: hash.toHex(),
    extrinsicsRoot: extrinsicsRoot.toHex(),
    parentHash: parentHash.toHex(),
    stateRoot: stateRoot.toHex(),
    validator: author?.toString(),
    digest: digest.toJSON(),
  };
}

export function extractBlockInfo(blockData) {
  if (!blockData) {
    return;
  }

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );
  const time = extractBlockTime(blockData.block.block);
  return {
    ...headerInfo,
    time,
    eventsCount: blockData.events.length,
    extrinsicsCount: blockData.block.block.extrinsics.length,
  };
}
