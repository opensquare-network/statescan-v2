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
  ss58Format: 0,
  chainIcon: "polkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  hidden: false,
  modules: {
    ...assethubChainModules,
    foreignAssets: true,
    multisig: true,
    staking: {
      rewards: true,
      nominations: true,
      validators: true,
    },
  },
  para: {
    relay: "Polkadot",
    id: "1000",
  },
  nodes: [
    { name: "Parity", url: "wss://polkadot-asset-hub-rpc.polkadot.io" },
    { name: "IBP1", url: "wss://asset-hub-polkadot.ibp.network" },
    { name: "Dwellir", url: "wss://asset-hub-polkadot-rpc.n.dwellir.com" },
    { name: "IBP2", url: "wss://asset-hub-polkadot.dotters.network" },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io/assethub" },
    { name: "LuckyFriday", url: "wss://rpc-asset-hub-polkadot.luckyfriday.io" },
    {
      name: "RadiumBlock",
      url: "wss://statemint.public.curie.radiumblock.co/ws",
    },
  ],
  useOnChainBlockData: true,
};

export default statemint;
