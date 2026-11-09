import { parseAbi } from "viem";

// ProtocolParams
// https://assethub-polkadot.subscan.io/account/0x4960a7bee233d439d64ec4023a10f259c83f5e78?tab=contract
const contract = {
  name: "ProtocolParams",
  abi: parseAbi([
    "function acceptOwnership()",
    "function addRelayer(address addr)",
    "function initialize(address _owner, address _feeConfig, address _quoteTokenRegistry, address[] _initialRelayers, address _guardian)",
    "function pause()",
    "function removeRelayer(address addr)",
    "function setGuardian(address _guardian)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
