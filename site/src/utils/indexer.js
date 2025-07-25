import extractBlockTime from "./extractBlockInfo/extractBlockTime";
import { keccakAsHex } from "@polkadot/util-crypto";

export function getFixedBlockIndexer(indexer, block) {
  if (!["gargantua", "nexus"].includes(process.env.REACT_APP_PUBLIC_CHAIN)) {
    return indexer;
  }

  const headerU8a = block.header.toU8a();
  const blockHash = keccakAsHex(headerU8a, 256);
  return {
    ...indexer,
    blockHash,
  };
}

export default function getBlockIndexer(block) {
  debugger;
  const blockHash = block.hash.toHex();
  const blockHeight = block.header.number.toNumber();
  const blockTime = extractBlockTime(block.extrinsics);

  const indexer = {
    blockHeight,
    blockHash,
    blockTime,
  };
  return getFixedBlockIndexer(indexer, block);
}
