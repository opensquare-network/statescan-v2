import { parseAbi } from "viem";

// FeeConfig
// https://assethub-polkadot.subscan.io/account/0x1e69d281e28f43f14aace7d494ad5b244ce8da9b?tab=contract
const contract = {
  name: "FeeConfig",
  abi: parseAbi([
    "function acceptOwnership()",
    "function guardianDisableLaunchDecay()",
    "function initialize(address _owner, address _feeRecipient, uint256 _buyFeeBps, uint256 _sellFeeBps)",
    "function initializeGuardianV19(address _guardian)",
    "function pause()",
    "function setBuyFee(uint256 _buyFeeBps)",
    "function setCooldownBlocks(uint256 _cooldownBlocks)",
    "function setCreationRelayerShare(uint256 _creationRelayerShareBps)",
    "function setCreatorShareBps(uint256 _creatorShareBps)",
    "function setDefaultLauncherConfig(address _defaultLauncherWallet, uint256 _launcherShareBps)",
    "function setFeeRecipient(address _feeRecipient)",
    "function setGuardian(address _guardian)",
    "function setLaunchDecayBlocks(uint256 _blocks)",
    "function setLaunchDecayStartBps(uint256 _bps)",
    "function setMaxBuyBps(uint256 _maxBuyBps)",
    "function setMaxIgnitionBps(uint256 _maxIgnitionBps)",
    "function setMaxInitialBuyBps(uint256 _maxInitialBuyBps)",
    "function setRelayerRecipient(address _relayerRecipient)",
    "function setSellFee(uint256 _sellFeeBps)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
