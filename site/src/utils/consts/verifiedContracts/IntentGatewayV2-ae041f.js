import { parseAbi } from "viem";

// IntentGatewayV2, implementation behind ERC1967Proxy 0xae041f7b0cb581876832830baeb6a2aa2a3c9716
// https://assethub-polkadot.subscan.io/account/0xae041f7b0cb581876832830baeb6a2aa2a3c9716?tab=contract
const contract = {
  name: "IntentGatewayV2",
  abi: parseAbi([
    "function acceptOwnership()",
    "function cancelOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), (uint256 relayerFee, uint64 height))",
    "function fillOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), (uint256 relayerFee, uint256 nativeDispatchFee, uint256 validUntil, (bytes32 token, uint256 amount)[], (bytes32 token, uint256 amount)[]))",
    "function initialize(((address host, address dispatcher, bool solverSelection, uint256 surplusShareBps, uint256 protocolFeeBps, address priceOracle), bytes[] peerChains, address relayer, address owner))",
    "function migrate()",
    "function onAccept(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function onGetResponse((((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer))",
    "function onGetTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer))",
    "function onPostRequestTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function pause()",
    "function placeOrder((bytes32 user, bytes source, bytes destination, uint256 deadline, uint256 nonce, uint256 fees, address session, ((bytes32 token, uint256 amount)[], bytes call), (bytes32 token, uint256 amount)[], (bytes32 beneficiary, (bytes32 token, uint256 amount)[], bytes call)), bytes32 graffiti)",
    "function quote((bytes dest, bytes to, bytes body, uint64 timeout, uint256 fee, address payer))",
    "function quote((bytes dest, uint64 height, bytes[] keys, uint64 timeout, uint256 fee, bytes context, address payer))",
    "function renounceOwnership()",
    "function select((bytes32 commitment, bytes32 userOpHash, bytes signature))",
    "function transferOwnership(address newOwner)",
    "function unpause()",
  ]),
};

export default contract;
