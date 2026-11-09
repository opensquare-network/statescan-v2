import { parseAbi } from "viem";

// SoneVibeWrappedXC20
// https://assethub-polkadot.subscan.io/account/0xbee14ad0949ebb63b90e04b8fd0a78af2f0f3354?tab=contract
const contract = {
  name: "SoneVibeWrappedXC20",
  abi: parseAbi([
    "function approve(address spender, uint256 value)",
    "function deposit(uint256 amount)",
    "function depositFor(address to, uint256 amount)",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
    "function recoverERC20(address tokenAddress, uint256 tokenAmount)",
    "function renounceOwnership()",
    "function transfer(address to, uint256 value)",
    "function transferFrom(address from, address to, uint256 value)",
    "function transferOwnership(address newOwner)",
    "function withdraw(uint256 amount)",
    "function withdrawTo(address to, uint256 amount)",
  ]),
};

export default contract;
