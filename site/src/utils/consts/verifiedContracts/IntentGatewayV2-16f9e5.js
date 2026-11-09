import { parseAbi } from "viem";

// IntentGatewayV2
// https://assethub-polkadot.subscan.io/account/0x16f9e57f735bbff9f6c4e5276330f9c437d0e9e0?tab=contract
const contract = {
  name: "IntentGatewayV2",
  abi: parseAbi([
    "function cancelOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), (uint256 relayerFee, uint64 height))",
    "function fillOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), (uint256 relayerFee, uint256 nativeDispatchFee, (bytes32 token, uint256 amount)[]))",
    "function init((address host, address dispatcher, bool solverSelection, uint256 surplusShareBps, uint256 protocolFeeBps, address priceOracle), (bytes chain, address gateway)[])",
    "function onAccept(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function onGetResponse((((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer))",
    "function onGetTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer))",
    "function onPostRequestTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function placeOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), bytes32 graffiti)",
    "function select((bytes32 commitment, address solver, bytes signature))",
  ]),
};

export default contract;
