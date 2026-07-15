import { ReactComponent as CoretimeKusama } from "../../../components/icons/coretime-kusama.svg";
import { kusamaColor } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://kusama-coretime-rpc.polkadot.io",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-coretime-kusama.luckyfriday.io",
  },
  {
    name: "Stakeworld",
    url: "wss://ksm-rpc.stakeworld.io/coretime",
  },
  {
    name: "Dwellir",
    url: "wss://coretime-kusama-rpc.n.dwellir.com",
  },
  {
    name: "OnFinality",
    url: "wss://coretime-kusama.api.onfinality.io/public-ws",
  },
];

const coretimeKusama = {
  name: "Coretime",
  icon: <CoretimeKusama />,
  identity: "kusama",
  value: "coretime-kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  ...kusamaColor,
  nodes,
  useOnChainBlockData: true,
};

export default coretimeKusama;
