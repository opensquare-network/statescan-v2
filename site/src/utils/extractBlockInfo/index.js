import extractExtrinsics from "./extractExtrinsics";
import extractEvents from "./extractEvents";
import extractBlockHeader from "./extractBlockHeader";
import extractBlockTime from "./extractBlockTime";
import getBlockIndexer from "../indexer";

export default function extractBlockInfo(blockData) {
  if (!blockData) {
    return;
  }

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );

  const blockIndexer = getBlockIndexer(blockData.block.block);
  const extrinsics = extractExtrinsics(
    blockData.block.block.extrinsics,
    blockData.events,
    blockIndexer,
  );
  const events = extractEvents(blockData.events, blockIndexer);

  return {
    ...headerInfo,
    hash: blockIndexer.blockHash,
    time: blockIndexer.blockTime,
    eventsCount: blockData.events.length,
    extrinsicsCount: blockData.block.block.extrinsics.length,
    extrinsics,
    events,
  };
}
