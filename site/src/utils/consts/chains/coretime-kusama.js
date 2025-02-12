import { ReactComponent as CoretimeKusama } from "../../../components/icons/coretime-kusama.svg";
import { kusamaColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/coretime-kusama",
  },
  {
    name: "IBP2",
    url: "wss://coretime-kusama.dotters.network/",
  },
  {
    name: "Parity",
    url: "wss://kusama-coretime-rpc.polkadot.io/",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-coretime-kusama.luckyfriday.io/",
  },
  {
    name: "Stakeworld",
    url: "wss://ksm-rpc.stakeworld.io/coretime",
  },
  {
    name: "Dwellir",
    url: "wss://coretime-kusama-rpc.dwellir.com/",
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
