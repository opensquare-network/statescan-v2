import { parseAbi } from "viem";

// MetadataRegistry
// https://assethub-polkadot.subscan.io/account/0x251cf704adbbe54050bfe5612635ea85966d3341?tab=contract
const contract = {
  name: "MetadataRegistry",
  abi: parseAbi([
    "function acceptOwnership()",
    "function initialize(address _owner)",
    "function initializeGuardianV19(address _guardian)",
    "function pause()",
    "function setGuardian(address _guardian)",
    "function setHandler(address handler, bool _isActive)",
    "function setMetadata(uint256 tokenId, address creator, string name, string symbol, bytes extraData)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function updateMetadata(uint256 tokenId, bytes extraData)",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
