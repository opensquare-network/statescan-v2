import { parseAbi } from "viem";

// TimelockController
// https://assethub-polkadot.subscan.io/account/0x80c8b6ea4c9ec77735f89070e74c69222e04bdff?tab=contract
const contract = {
  name: "TimelockController",
  abi: parseAbi([
    "function cancel(bytes32 id)",
    "function execute(address target, uint256 value, bytes payload, bytes32 predecessor, bytes32 salt)",
    "function executeBatch(address[] targets, uint256[] values, bytes[] payloads, bytes32 predecessor, bytes32 salt)",
    "function grantRole(bytes32 role, address account)",
    "function onERC1155BatchReceived(address, address, uint256[], uint256[], bytes)",
    "function onERC1155Received(address, address, uint256, uint256, bytes)",
    "function onERC721Received(address, address, uint256, bytes)",
    "function renounceRole(bytes32 role, address callerConfirmation)",
    "function revokeRole(bytes32 role, address account)",
    "function schedule(address target, uint256 value, bytes data, bytes32 predecessor, bytes32 salt, uint256 delay)",
    "function scheduleBatch(address[] targets, uint256[] values, bytes[] payloads, bytes32 predecessor, bytes32 salt, uint256 delay)",
    "function updateDelay(uint256 newDelay)",
  ]),
};

export default contract;
