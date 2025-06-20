import { ReactComponent as AssetHubWestend } from "../../../components/icons/assethub-westend.svg";
import { assethubChainModules } from "./assetChain";

const westmint = {
  name: "AssetHub",
  icon: <AssetHubWestend />,
  identity: "westend",
  sub: "westend",
  value: "westmint",
  domain: "assethub-westend",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  chainIcon: "westend",
  color: "#DA68A7",
  colorSecondary: "rgba(218, 104, 167, 0.1)",
  buttonColor: "#DA68A7",
  modules: assethubChainModules,
  para: {
    relay: "Westend",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://westend-asset-hub-rpc.polkadot.io/" },
    { name: "IBP1", url: "wss://sys.ibp.network/asset-hub-westend" },
    { name: "Dwellir", url: "wss://asset-hub-westend-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://westmint-rpc-tn.dwellir.com/" },
    { name: "IBP2", url: "wss://asset-hub-westend.dotters.network/" },
    {
      name: "Permanence DAO EU",
      url: "wss://asset-hub-westend.rpc.permanence.io/",
    },
  ],
  useOnChainBlockData: true,
};

export default westmint;
