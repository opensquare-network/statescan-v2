import { ReactComponent as CoretimePolkadot } from "../../../components/icons/coretime-polkadot.svg";
import { polkadotColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://coretime-polkadot.ibp.network",
  },
  {
    name: "IBP2",
    url: "wss://coretime-polkadot.dotters.network",
  },
  {
    name: "Parity",
    url: "wss://polkadot-coretime-rpc.polkadot.io",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-coretime-polkadot.luckyfriday.io",
  },
  {
    name: "OnFinality",
    url: "wss://coretime-polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "Dwellir",
    url: "wss://coretime-polkadot-rpc.n.dwellir.com",
  },
  {
    name: "Stakeworld",
    url: "wss://dot-rpc.stakeworld.io/coretime",
  },
];

const coretimePolkadot = {
  name: "Coretime",
  icon: <CoretimePolkadot />,
  identity: "polkadot",
  value: "coretime-polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  ...polkadotColor,
  nodes,
  useOnChainBlockData: true,
};

export default coretimePolkadot;
