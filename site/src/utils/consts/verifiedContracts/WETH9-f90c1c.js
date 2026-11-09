import { parseAbi } from "viem";

// WETH9
// https://assethub-polkadot.subscan.io/account/0xf90c1c9529a73f9c33f08e41c5611fa483ba2721?tab=contract
const contract = {
  name: "WETH9",
  abi: parseAbi([
    "function approve(address guy, uint256 wad)",
    "function deposit()",
    "function transfer(address dst, uint256 wad)",
    "function transferFrom(address src, address dst, uint256 wad)",
    "function withdraw(uint256 wad)",
  ]),
};

export default contract;
