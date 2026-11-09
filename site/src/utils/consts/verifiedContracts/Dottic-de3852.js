import { parseAbi } from "viem";

// Dottic
// https://assethub-polkadot.subscan.io/account/0xde3852d8db2a59811b2a09a5b5a3d4ea09860c58?tab=contract
const contract = {
  name: "Dottic",
  abi: parseAbi([
    "function finalizeByLuck()",
    "function guessSolution(string guess)",
    "function openPixel(uint256 pixelId)",
    "function revealAnswer(string answer)",
  ]),
};

export default contract;
