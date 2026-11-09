import { parseAbi } from "viem";

// AssetHubNominationPoolAdapterRouter
// https://assethub-polkadot.subscan.io/account/0xc3f2508c50134e62f1c8078763a6547d3793204c?tab=contract
const contract = {
  name: "AssetHubNominationPoolAdapterRouter",
  abi: parseAbi([
    "function acceptOwnership()",
    "function acceptOwnershipAndBindVault(address newVault)",
    "function activateEncoder()",
    "function bindVault(address newVault)",
    "function cancelOwnershipTransfer()",
    "function cancelStagedEncoder()",
    "function claimReleased(uint256 releaseId, uint256 unstakeId)",
    "function harvest(address positionAccount)",
    "function requestUnstake(address positionAccount, uint256 amount)",
    "function stageEncoder(address newEncoder, bytes32 expectedConfigHash)",
    "function stake(address positionAccount, uint256 amount)",
    "function syncUnstaked(uint256 throughUnstakeId)",
    "function transferOwnership(address newOwner)",
  ]),
};

export default contract;
