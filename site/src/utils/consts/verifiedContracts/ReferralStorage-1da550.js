import { parseAbi } from "viem";

// ReferralStorage
// https://assethub-polkadot.subscan.io/account/0x1da550fb425e381319a32585959dd0807374af45?tab=contract
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
