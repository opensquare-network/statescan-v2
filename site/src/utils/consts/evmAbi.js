import { parseAbi } from "viem";

// Function ABIs used to decode the calldata carried by `revive.call`. Only
// state changing functions are listed: view/pure methods never show up in an
// extrinsic, so they are left out. Selectors are global, so a signature shared
// by several standards (approve(address,uint256) in ERC-20/ERC-721,
// setApprovalForAll(address,bool) in ERC-721/ERC-1155) is declared only once.
export const ERC20_ABI = parseAbi([
  "function approve(address spender, uint256 amount)",
  "function transfer(address to, uint256 amount)",
  "function transferFrom(address from, address to, uint256 amount)",
  "function increaseAllowance(address spender, uint256 addedValue)",
  "function decreaseAllowance(address spender, uint256 subtractedValue)",
]);

export const ERC721_ABI = parseAbi([
  // Same selector as the ERC-20 allowance approve, declared in ERC20_ABI.
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
  "function setApprovalForAll(address operator, bool approved)",
]);

export const ERC1155_ABI = parseAbi([
  "function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)",
]);

// ERC-1363 payable token, an ERC-20 extension.
export const ERC1363_ABI = parseAbi([
  "function transferAndCall(address to, uint256 value) returns (bool)",
  "function transferAndCall(address to, uint256 value, bytes data) returns (bool)",
  "function transferFromAndCall(address from, address to, uint256 value) returns (bool)",
  "function transferFromAndCall(address from, address to, uint256 value, bytes data) returns (bool)",
  "function approveAndCall(address spender, uint256 value) returns (bool)",
  "function approveAndCall(address spender, uint256 value, bytes data) returns (bool)",
]);

// Fallback used when the callee is not a known contract.
export const EVM_CALL_ABI = [
  ...ERC20_ABI,
  ...ERC721_ABI,
  ...ERC1155_ABI,
  ...ERC1363_ABI,
];
