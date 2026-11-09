import { parseAbi } from "viem";

// MetadataRegistry, implementation behind ERC1967Proxy 0xd967872f1ee5e233cfe1a2ded4ec4a3c922b21e5
// https://assethub-polkadot.subscan.io/account/0xd967872f1ee5e233cfe1a2ded4ec4a3c922b21e5?tab=contract
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
