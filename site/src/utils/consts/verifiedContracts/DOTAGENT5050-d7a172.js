import { parseAbi } from "viem";

// DOTAGENT5050
// https://assethub-polkadot.subscan.io/account/0xd7a1723bfb5c0b0d04a0378e1a2f279a71051f94?tab=contract
const contract = {
  name: "DOTAGENT5050",
  abi: parseAbi([
    "function buyTickets(uint256 raffleId, uint256 quantity)",
    "function claimCreatorFee(uint256 raffleId)",
    "function claimPrize(uint256 raffleId)",
    "function createRaffle(string name, uint256 duration)",
    "function delegateTo(address agent, uint256 deadline)",
    "function endRaffle(uint256 raffleId)",
    "function executeAsAgent(address user, bytes actionData)",
    "function registerAgent(address agent)",
    "function revokeDelegation(address agent)",
    "function unregisterAgent(address agent)",
    "function updateRaffleStates()",
  ]),
};

export default contract;
