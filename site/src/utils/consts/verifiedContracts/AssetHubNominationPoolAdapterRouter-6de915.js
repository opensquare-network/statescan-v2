import { parseAbi } from "viem";

// AssetHubNominationPoolAdapterRouter
// https://assethub-polkadot.subscan.io/account/0x6de915f94575605dfa4d5ab150d3a4ece2c54ced?tab=contract
const contract = {
  name: "AssetHubNominationPoolAdapterRouter",
  abi: parseAbi([
    "function acceptOwnership()",
    "function acceptOwnershipAndBindVault(address newVault)",
    "function bindVault(address newVault)",
    "function cancelOwnershipTransfer()",
    "function checkpointUnbondCleared(address positionAccount)",
    "function harvest(address positionAccount)",
    "function recoverResidualUnbond(address positionAccount, uint256 finalizedMemberPoints)",
    "function replaceEncoder(address newEncoder, bytes32 expectedConfigHash)",
    "function requestUnstake(address positionAccount, uint256 finalizedMemberPoints, uint256 bookPrincipalDebit)",
    "function setBindingCodeHashApproval(bytes32 vaultCodeHash, bytes32 liquidityPoolCodeHash, bool approved)",
    "function setEncoderCodeHashApproval(bytes32 codeHash, bool approved)",
    "function setModuleCodeHashApprovals(address featureModule, address instantModule, address withdrawalModule, bool approved)",
    "function stake(address positionAccount, uint256 amount)",
    "function transferOwnership(address newOwner)",
    "function withdrawMatured(address positionAccount, uint32 slashingSpans)",
  ]),
};

export default contract;
