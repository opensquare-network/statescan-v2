import { ReactComponent as CoretimePolkadot } from "../../../components/icons/coretime-polkadot.svg";
import { polkadotColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/coretime-polkadot",
  },
  {
    name: "IBP2",
    url: "wss://coretime-polkadot.dotters.network/",
  },
  {
    name: "Parity",
    url: "wss://polkadot-coretime-rpc.polkadot.io/",
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
