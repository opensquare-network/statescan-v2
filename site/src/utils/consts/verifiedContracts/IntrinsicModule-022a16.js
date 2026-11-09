import { parseAbi } from "viem";

// IntrinsicModule
// https://assethub-polkadot.subscan.io/account/0x022a168d64d85007ed8c7f08a672fd997e0c4bdd?tab=contract
const contract = {
  name: "IntrinsicModule",
  abi: parseAbi([
    "function cancelSameChain((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), bytes32 commitment)",
    "function fillOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), (uint256 relayerFee, uint256 nativeDispatchFee, uint256 validUntil, (bytes32 token, uint256 amount)[], (bytes32 token, uint256 amount)[]), bytes32 commitment)",
  ]),
};

export default contract;
