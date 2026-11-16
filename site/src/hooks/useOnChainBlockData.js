import { useCallback, useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";
// subpath import: the package index pulls in the scan side (mongo, log4js) as well
import { decodeExtrinsic } from "@osn/scan-common/src/chain/decodeExtrinsic";

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

export default function useOnChainBlockData(blockHeightOrHash) {
  const api = useChainApi();
  const [blockData, setBlockData] = useState();

  const fetchBlockData = useCallback(async () => {
    if (!api || !blockHeightOrHash) {
      return;
    }

    let blockHash;
    if (
      typeof blockHeightOrHash === "number" ||
      /^\d+$/.test(blockHeightOrHash)
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

    setBlockData({
      block,
      events,
      validators,
    });
  }, [api, blockHeightOrHash]);

  useEffect(() => {
    fetchBlockData().catch(() => setBlockData(null));
  }, [fetchBlockData]);

  return blockData;
}
