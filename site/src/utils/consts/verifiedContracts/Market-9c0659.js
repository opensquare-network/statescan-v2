import { parseAbi } from "viem";

// Market
// https://assethub-polkadot.subscan.io/account/0x9c06597354326d7f421222ca81363cc848b87132?tab=contract
const contract = {
  name: "Market",
  abi: parseAbi([
    "function buy(address nft, uint256 tokenId)",
    "function cancel(address nft, uint256 tokenId)",
    "function list(address nft, uint256 tokenId, uint256 price)",
    "function renounceOwnership()",
    "function setPlatformFee(address recipient, uint16 bps)",
    "function transferOwnership(address newOwner)",
    "function updatePrice(address nft, uint256 tokenId, uint256 price)",
  ]),
};

export default contract;
