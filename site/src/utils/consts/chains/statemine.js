import { ReactComponent as AssetHubKusama } from "../../../components/icons/assethub-kusama.svg";
import { assetChainModules } from "./assetChain";

const statemine = {
  name: "Statemine",
  icon: <AssetHubKusama />,
  identity: "kusama",
  sub: "kusama",
  value: "statemine",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  chainIcon: "kusama",
  color: "#3765DC",
  colorSecondary: "rgba(55, 101, 220, 0.1)",
  buttonColor: "#000000",
  logo: "logo-img-2",
  modules: assetChainModules,
  para: {
    relay: "Kusama",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://kusama-asset-hub-rpc.polkadot.io/" },
    { name: "OnFinality", url: "wss://statemine.api.onfinality.io/public-ws" },
    { name: "IBP1", url: "wss://sys.ibp.network/statemine" },
    { name: "Dwellir", url: "wss://statemine-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://statemine-rpc-tn.dwellir.com" },
    { name: "IBP2", url: "wss://sys.dotters.network/statemine" },
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
