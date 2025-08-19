import { ReactComponent as AssetHubKusama } from "../../../components/icons/assethub-kusama.svg";
import { assethubChainModules } from "./assetChain";

const statemine = {
  name: "AssetHub",
  icon: <AssetHubKusama />,
  identity: "kusama",
  sub: "kusama",
  value: "statemine",
  domain: "assethub-kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  chainIcon: "kusama",
  color: "#3765DC",
  colorSecondary: "rgba(55, 101, 220, 0.1)",
  buttonColor: "#000000",
  modules: {
    ...assethubChainModules,
    foreignAssets: true,
    multisig: true,
  },
  para: {
    relay: "Kusama",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://kusama-asset-hub-rpc.polkadot.io/" },
    { name: "IBP1", url: "wss://sys.ibp.network/asset-hub-kusama" },
    { name: "Dwellir", url: "wss://asset-hub-kusama-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://statemine-rpc-tn.dwellir.com" },
    { name: "IBP2", url: "wss://asset-hub-kusama.dotters.network" },
    { name: "LuckyFriday", url: "wss://rpc-asset-hub-kusama.luckyfriday.io" },
    {
      name: "RadiumBlock",
      url: "wss://statemine.public.curie.radiumblock.co/ws",
    },
    { name: "Stakeworld", url: "wss://ksm-rpc.stakeworld.io/assethub" },
  ],
  useOnChainBlockData: true,
};

export default statemine;
