import { parseAbi } from "viem";

// PositionStakingAccountFactory
// https://assethub-polkadot.subscan.io/account/0x99b6fea482c86bf5a196222f9c82185bcd6c3377?tab=contract
const contract = {
  name: "PositionStakingAccountFactory",
  abi: parseAbi([
    "function bindRouter(address newRouter, bytes32 expectedCodeHash)",
    "function deploy(address positionAccount, address xcmPrecompile, uint256 minimumReserve)",
  ]),
};

export default contract;
