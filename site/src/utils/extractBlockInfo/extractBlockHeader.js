import { extractAuthor } from "@polkadot/api-derive/type/util";

export default function extractBlockHeader(header, validators) {
  if (!header) {
    return;
  }

  const { extrinsicsRoot, number, parentHash, stateRoot, digest } = header;
  const author = extractAuthor(digest, validators);

  return {
    height: number.toNumber(),
    extrinsicsRoot: extrinsicsRoot.toHex(),
    parentHash: parentHash.toHex(),
    stateRoot: stateRoot.toHex(),
    validator: author?.toString(),
    digest: digest.toJSON(),
  };
}
