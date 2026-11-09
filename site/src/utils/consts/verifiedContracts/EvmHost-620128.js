import { parseAbi } from "viem";

// EvmHost
// https://assethub-polkadot.subscan.io/account/0x620128e2b19193d6bd244a3ac8d3bba0541b19c3?tab=contract
const contract = {
  name: "EvmHost",
  abi: parseAbi([
    "function deleteStateMachineCommitment((uint256 stateMachineId, uint256 height), address fisherman)",
    "function dispatch((bytes dest, bytes to, bytes body, uint64 timeout, uint256 fee, address payer))",
    "function dispatch((bytes dest, uint64 height, bytes[] keys, uint64 timeout, uint256 fee, bytes context, address payer))",
    "function dispatchIncoming(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer)",
    "function dispatchIncoming((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer)",
    "function dispatchTimeOut(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer), (uint256 fee, address sender), bytes32 commitment)",
    "function dispatchTimeOut(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer), (uint256 fee, address sender), bytes32 commitment)",
    "function fundRequest(bytes32 commitment, uint256 amount)",
    "function initialize((address feeToken, address admin, address handler, address hostManager, address uniswapV2, uint256 unStakingPeriod, uint256 challengePeriod, address consensusClient, uint256[] stateMachines, bytes hyperbridge))",
    "function recordEpoch(uint256 authoritySetId, address relayer)",
    "function setConsensusState(bytes state, (uint256 stateMachineId, uint256 height), (uint256 timestamp, bytes32 overlayRoot, bytes32 stateRoot))",
    "function setFrozenState(uint8 newState)",
    "function stateMachineCommitment((uint256 stateMachineId, uint256 height))",
    "function storeConsensusState(bytes state)",
    "function storeStateMachineCommitment((uint256 stateMachineId, uint256 height), (uint256 timestamp, bytes32 overlayRoot, bytes32 stateRoot))",
    "function updateHostParams((address feeToken, address admin, address handler, address hostManager, address uniswapV2, uint256 unStakingPeriod, uint256 challengePeriod, address consensusClient, uint256[] stateMachines, bytes hyperbridge))",
    "function withdraw((address beneficiary, uint256 amount, address token))",
  ]),
};

export default contract;
