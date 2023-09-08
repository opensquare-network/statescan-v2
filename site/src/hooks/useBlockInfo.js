import { extractAuthor } from "@polkadot/api-derive/type/util";
import { normalizeCall } from "../utils/block/normalizeCall";
import { useMemo } from "react";

function extractBlockTime(block) {
  const setTimeExtrinsic = block.extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set",
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}
function checkIsExtrinsicResult(section, method) {
  return (
    "system" === section &&
    ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method)
  );
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

function extractEvents(events, blockIndexer) {
  return (events || []).map((event, eventIndex) => {
    const {
      phase,
      event: { data, method, section, meta },
    } = event;

    let extrinsicIndex;
    const isExtrinsic = phase.isApplyExtrinsic;
    if (isExtrinsic) {
      extrinsicIndex = phase.asApplyExtrinsic.toNumber();
    }
    const isExtrinsicResult = checkIsExtrinsicResult(section, method);
    const docs = meta.docs.map((d) => d.toString());

    const args = [];
    let dataIndex = 0;
    for (const item of data) {
      const name = meta.fields[dataIndex].name.toString();
      const typeName = meta.fields[dataIndex].typeName.toString();

      args.push({
        name,
        typeName,
        value: item.toJSON(),
      });

      dataIndex++;
    }

    return {
      indexer: {
        ...blockIndexer,
        eventIndex,
        extrinsicIndex,
      },
      method: method,
      section: section,
      isExtrinsic,
      isExtrinsicResult,
      args,
      docs,
    };
  });
}

function getLifetime(extrinsic, indexer) {
  if (!extrinsic.era.isMortalEra) {
    return null;
  }

  const mortal = extrinsic.era.asMortalEra;
  return [mortal.birth(indexer.blockHeight), mortal.death(indexer.blockHeight)];
}

function isExtrinsicSuccess(events) {
  return events.some((e) => e.event.method === "ExtrinsicSuccess");
}

function normalizeExtrinsic(extrinsic, events, indexer) {
  const hash = extrinsic.hash.toHex();
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);

  const isSigned = extrinsic.isSigned;
  let obj = {
    indexer,
    version,
    hash,
    isSuccess,
    call,
    isSigned,
  };

  if (isSigned) {
    const tip = extrinsic.tip ? extrinsic.tip.toBigInt().toString() : "0";
    const nonce = extrinsic.nonce.toNumber();
    const signer = extrinsic.signer.toString();
    const signature = extrinsic.signature.toString();
    const lifetime = getLifetime(extrinsic, indexer);

    obj = {
      ...obj,
      nonce,
      signer,
      signature,
      tip,
      lifetime,
    };
  }

  return obj;
}

function extractExtrinsicEvents(events, extrinsicIndex) {
  return events.filter((event) => {
    const { phase } = event;
    return !phase.isNone && phase.value.toNumber() === extrinsicIndex;
  });
}

function extractExtrinsics(extrinsics = [], blockEvents = [], blockIndexer) {
  let index = 0;
  let normalizedExtrinsics = [];
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };

    const normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    normalizedExtrinsics.push(normalized);
  }

  return normalizedExtrinsics;
}

function extractBlockInfo(blockData) {
  if (!blockData) {
    return;
  }

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );
  const time = extractBlockTime(blockData.block.block);

  const blockIndexer = {
    blockHash: headerInfo.hash,
    blockHeight: headerInfo.height,
    blockTime: time,
  };

  const extrinsics = extractExtrinsics(
    blockData.block.block.extrinsics,
    blockData.events,
    blockIndexer,
  );
  const events = extractEvents(blockData.events, blockIndexer);

  return {
    ...headerInfo,
    time,
    eventsCount: blockData.events.length,
    extrinsicsCount: blockData.block.block.extrinsics.length,
    extrinsics,
    events,
  };
}

export default function useBlockInfo(blockData) {
  return useMemo(() => {
    if (!blockData) {
      return null;
    }
    return extractBlockInfo(blockData);
  }, [blockData]);
}
