/**
 * This file provides util functions to check metadata onchain configuration. An example onchain metadata is as follows:
 * {
 *   deposit: 123,
 *   data: "0x...",
 *   isFrozen: true
 * }
 *
 * The key point is the data field. Usually it's a hex data of a IPFS CID. The content which the IPFS CID represents is
 * the definition for the NFT class/instance. We should fetch the content and parse the definition by pre-defined
 * formats.
 */

const { isCid } = require("../utils/isCid");
const { isHex, hexToString } = require("@polkadot/util");

// Metadata data filed should be a IPFS CID hex
async function isMetadataConfigIpfs(metadata = { data: "" }) {
  const { data } = metadata;
  if (!isHex(data)) {
    return false;
  }

  const maybeIpfsCid = hexToString(data);
  return isCid(maybeIpfsCid);
}

function getMetadataCid(metadata = { data: "" }) {
  const { data } = metadata;
  return hexToString(data);
}

module.exports = {
  isMetadataConfigIpfs,
  getMetadataCid,
};
