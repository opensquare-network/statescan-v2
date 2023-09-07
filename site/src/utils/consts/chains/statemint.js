import Statemint from "../../../components/icons/statemintIcon";
import { assetChainModules } from "./assetChain";

const statemint = {
  name: "Statemint",
  icon: <Statemint />,
  identity: "polkadot",
  sub: "polkadot",
  value: "statemint",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  chainIcon: "polkadot",
  color: "#E6007A",
  colorSecondary: "rgba(230, 0, 122, 0.1)",
  buttonColor: "#E6007A",
  hidden: false,
  modules: assetChainModules,
  para: {
    relay: "Polkadot",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://polkadot-asset-hub-rpc.polkadot.io" },
    { name: "Dwellir", url: "wss://statemint-rpc.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://statemint-rpc-tn.dwellir.com" },
    { name: "IBP-GeoDNS1", url: "wss://sys.ibp.network/statemint" },
    { name: "IBP-GeoDNS2", url: "wss://sys.dotters.network/statemint" },
    { name: "LuckyFriday", url: "wss://rpc-asset-hub-polkadot.luckyfriday.io" },
    { name: "OnFinality", url: "wss://statemint.api.onfinality.io/public-ws" },
    {
      name: "RadiumBlock",
      url: "wss://statemint.public.curie.radiumblock.co/ws",
    },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io/assethub" },
  ],
};

export default statemint;
