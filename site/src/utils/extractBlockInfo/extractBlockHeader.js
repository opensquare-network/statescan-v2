import { extractAuthor } from "@polkadot/api-derive/type/util";
import { keccakAsHex } from "@polkadot/util-crypto";

export default function extractBlockHeader(header, validators) {
  if (!header) {
    return;
  }

  const {
    extrinsicsRoot,
    number,
    parentHash,
    stateRoot,
    hash: rawHash,
    digest,
  } = header;
  const author = extractAuthor(digest, validators);
  let hash = rawHash.toString();
  if (process.env.REACT_APP_PUBLIC_CHAIN === "gargantua") {
    hash = keccakAsHex(header.toU8a(), 256);
  }

  return {
    height: number.toNumber(),
    hash,
    extrinsicsRoot: extrinsicsRoot.toHex(),
    parentHash: parentHash.toHex(),
    stateRoot: stateRoot.toHex(),
    validator: author?.toString(),
    digest: digest.toJSON(),
  };
}
