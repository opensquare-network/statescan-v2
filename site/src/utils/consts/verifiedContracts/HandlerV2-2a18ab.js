import { parseAbi } from "viem";

// HandlerV2
// https://assethub-polkadot.subscan.io/account/0x2a18ab35dea43474882e05a661e2f20fe89c0535?tab=contract
const contract = {
  name: "HandlerV2",
  abi: parseAbi([
    "function batchCall(bytes[] calls)",
    "function handleConsensus(address host, bytes proof)",
    "function handleGetRequestTimeouts(address host, ((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context)[], (uint256 stateMachineId, uint256 height), bytes[] proof))",
    "function handleGetResponses(address host, (((uint256 stateMachineId, uint256 height), bytes32[] multiproof, uint256 leafCount), (((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), uint256 index)[]))",
    "function handlePostRequestTimeouts(address host, ((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body)[], (uint256 stateMachineId, uint256 height), bytes[] proof))",
    "function handlePostRequests(address host, (((uint256 stateMachineId, uint256 height), bytes32[] multiproof, uint256 leafCount), ((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), uint256 index)[]))",
  ]),
};

export default contract;
