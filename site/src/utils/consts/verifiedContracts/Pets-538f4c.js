import { parseAbi } from "viem";

// Pets
// https://assethub-polkadot.subscan.io/account/0x538f4c0dbb9c1b5582b64622844eb0c3c4c35974?tab=contract
const contract = {
  name: "Pets",
  abi: parseAbi([
    "function approve(address to, uint256 tokenId)",
    "function mint(address to)",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
    "function setApprovalForAll(address operator, bool approved)",
    "function transferFrom(address from, address to, uint256 tokenId)",
  ]),
};

export default contract;
