import { ReactComponent as AssetHubWestend } from "../../../components/icons/assethub-westend.svg";
import { assetChainModules } from "./assetChain";

const westmint = {
  name: "AssetHub",
  icon: <AssetHubWestend />,
  identity: "westend",
  sub: "westend",
  value: "westmint",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  chainIcon: "westend",
  color: "#DA68A7",
  colorSecondary: "rgba(218, 104, 167, 0.1)",
  buttonColor: "#DA68A7",
  modules: assetChainModules,
  para: {
    relay: "Westend",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://westend-asset-hub-rpc.polkadot.io" },
    { name: "Dwellir", url: "wss://westmint-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://westmint-rpc-tn.dwellir.com" },
    { name: "IBP-GeoDNS1", url: "wss://sys.ibp.network/westmint" },
    { name: "IBP-GeoDNS2", url: "wss://sys.dotters.network/westmint" },
    { name: "OnFinality", url: "wss://westmint.api.onfinality.io/public-ws" },
    { name: "Stakeworld", url: "wss://wnd-rpc.stakeworld.io/assethub" },
  ],
  useOnChainBlockData: true,
};

export default westmint;
