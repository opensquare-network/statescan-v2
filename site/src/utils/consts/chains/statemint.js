import { ReactComponent as AssetHubPolkadot } from "../../../components/icons/assethub-polkadot.svg";
import { assethubChainModules } from "./assetChain";
import { polkadotColor } from "./common";

const statemint = {
  name: "AssetHub",
  icon: <AssetHubPolkadot />,
  identity: "polkadot",
  sub: "polkadot",
  value: "statemint",
  domain: "assethub-polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  chainIcon: "polkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  hidden: false,
  modules: { ...assethubChainModules, foreignAssets: true },
  para: {
    relay: "Polkadot",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://polkadot-asset-hub-rpc.polkadot.io/" },
    { name: "OnFinality", url: "wss://statemint.api.onfinality.io/public-ws" },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io/assethub" },
    { name: "Dwellir", url: "wss://statemint-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://statemint-rpc-tn.dwellir.com" },
    { name: "LuckyFriday", url: "wss://rpc-asset-hub-polkadot.luckyfriday.io" },
    {
      name: "RadiumBlock",
      url: "wss://statemint.public.curie.radiumblock.co/ws",
    },
  ],
  useOnChainBlockData: true,
};

export default statemint;
