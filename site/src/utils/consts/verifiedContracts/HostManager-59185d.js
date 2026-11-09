import { parseAbi } from "viem";

// HostManager
// https://assethub-polkadot.subscan.io/account/0x59185dac59b2e0ade6a414964d039b0474d942c0?tab=contract
const contract = {
  name: "HostManager",
  abi: parseAbi([
    "function onAccept(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function onGetResponse((((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer))",
    "function onGetTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer))",
    "function onPostRequestTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function setIsmpHost(address hostAddr)",
  ]),
};

export default contract;
