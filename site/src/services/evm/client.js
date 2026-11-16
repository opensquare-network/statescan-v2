import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const evmRpcUrl = process.env.REACT_APP_PUBLIC_EVM_RPC_URL;

export function createEvmPublicClient(rpcUrl = evmRpcUrl) {
  if (!rpcUrl) {
    return null;
  }

  return createPublicClient({
    chain: mainnet,
    transport: http(rpcUrl),
  });
}

const evmPublicClient = createEvmPublicClient();

export default evmPublicClient;
