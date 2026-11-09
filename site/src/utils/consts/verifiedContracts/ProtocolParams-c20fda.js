import { parseAbi } from "viem";

// ProtocolParams, implementation behind ERC1967Proxy 0xc20fdad59e0c618be7c95dbf1834a185b783f2b4
// https://assethub-polkadot.subscan.io/account/0xc20fdad59e0c618be7c95dbf1834a185b783f2b4?tab=contract
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
