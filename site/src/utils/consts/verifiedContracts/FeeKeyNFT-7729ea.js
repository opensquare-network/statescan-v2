import { parseAbi } from "viem";

// FeeKeyNFT
// https://assethub-polkadot.subscan.io/account/0x7729eaad7719c16ba97cfd273e98c307ef55697a?tab=contract
const contract = {
  name: "FeeKeyNFT",
  abi: parseAbi([
    "function acceptOwnership()",
    "function approve(address to, uint256 tokenId)",
    "function mint(uint256 tokenId, address creator)",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
    "function setApprovalForAll(address operator, bool approved)",
    "function setBaseURI(string baseURI_)",
    "function setBondingCurve(address _bondingCurve)",
    "function setCreatorFeeVault(address _vault)",
    "function transferFrom(address from, address to, uint256 tokenId)",
    "function transferOwnership(address newOwner)",
  ]),
};

export default contract;
