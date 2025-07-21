import { ReactComponent as CoretimeWestend } from "../../../components/icons/coretime-westend.svg";
import { westendCommon } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://westend-coretime-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://coretime-westend-rpc.n.dwellir.com",
  },
];

const coretimeWestend = {
  name: "Coretime",
  icon: <CoretimeWestend />,
  identity: "westend",
  value: "coretime-westend",
  chain: "westend",
  symbol: "WND",
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
  para: {
    relay: "Westend",
    id: "1005",
  },
};

export default coretimeWestend;
