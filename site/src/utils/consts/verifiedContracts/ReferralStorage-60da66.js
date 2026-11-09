import { parseAbi } from "viem";

// ReferralStorage, implementation behind ERC1967Proxy 0x60da66c98d82e729c016361ce5024be6f010286b
// https://assethub-polkadot.subscan.io/account/0x60da66c98d82e729c016361ce5024be6f010286b?tab=contract
const contract = {
  name: "ReferralStorage",
  abi: parseAbi([
    "function acceptOwnership()",
    "function initialize(address _owner)",
    "function initializeGuardianV19(address _guardian)",
    "function pause()",
    "function registerCode(bytes32 _code)",
    "function setCodeOwner(bytes32 _code, address _newOwner)",
    "function setGuardian(address _guardian)",
    "function setHandler(address _handler, bool _isActive)",
    "function setTraderReferralCode(address _account, bytes32 _code)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
