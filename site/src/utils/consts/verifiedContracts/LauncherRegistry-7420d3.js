import { parseAbi } from "viem";

// LauncherRegistry
// https://assethub-polkadot.subscan.io/account/0x7420d3da081d32645bef5763801ba0045bcb7efe?tab=contract
const contract = {
  name: "LauncherRegistry",
  abi: parseAbi([
    "function acceptOwnership()",
    "function deactivateLauncher(uint32 launcherId)",
    "function initialize(address _owner)",
    "function initializeGuardianV19(address _guardian)",
    "function pause()",
    "function reactivateLauncher(uint32 launcherId)",
    "function registerLauncher((address admin, address feeWallet, uint16 buyFeeBps, uint16 sellFeeBps, uint16 launcherShareBps, bool restricted, string name, string website, string logoUri, bool active))",
    "function setAllowedCreator(uint32 launcherId, address creator, bool allowed)",
    "function setGuardian(address _guardian)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function updateLauncher(uint32 launcherId, (address admin, address feeWallet, uint16 buyFeeBps, uint16 sellFeeBps, uint16 launcherShareBps, bool restricted, string name, string website, string logoUri, bool active))",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
