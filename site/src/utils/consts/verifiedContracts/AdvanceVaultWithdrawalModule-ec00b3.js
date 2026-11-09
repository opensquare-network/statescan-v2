import { parseAbi } from "viem";

// AdvanceVaultWithdrawalModule
// https://assethub-polkadot.subscan.io/account/0xec00b3aa9f9254b7af7e6de1d7244d978fabed65?tab=contract
const contract = {
  name: "AdvanceVaultWithdrawalModule",
  abi: parseAbi([
    "function finalizeReleasedPrincipalWithdrawal(address positionAccount)",
    "function liquidateMaturedAdvance(address positionAccount)",
    "function recordFinalizedLossCheckpoint(address positionAccount, uint256 memberPoints, uint256 unbondingPoints, bytes32 finalizedBlockHash, uint64 finalizedBlockNumber, bool stakingAccountCleared)",
    "function recordFinalizedStakingClearance(address positionAccount, uint256 memberPoints, uint256 unbondingPoints, bytes32 finalizedBlockHash, uint64 finalizedBlockNumber)",
    "function recoverResidualUnbond(address positionAccount, uint256 finalizedMemberPoints)",
    "function releaseMaturedPrincipalWithdrawal(address positionAccount, uint32 slashingSpans)",
    "function requestInstantPrincipalWithdrawal(uint256 finalizedMemberPoints, uint256 minPayout, uint256 expiry)",
    "function requestPrincipalWithdrawal(uint256 finalizedMemberPoints)",
  ]),
};

export default contract;
