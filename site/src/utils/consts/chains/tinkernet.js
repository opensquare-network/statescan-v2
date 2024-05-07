import { ReactComponent as Tinkernet } from "../../../components/icons/tinkernet.svg";

const nodes = [
  {
    name: "Dwellir",
    url: "wss://tinkernet-rpc.dwellir.com/",
  },
];

const tinkernet = {
  name: "Tinkernet",
  icon: <Tinkernet />,
  identity: "tinkernet",
  value: "tinkernet",
  chain: "kusama",
  symbol: "TNKR",
  decimals: 12,
  color: "#EB4880",
  colorSecondary: "rgba(235, 72, 129, 0.1)",
  nodes,
  useOnChainBlockData: true,
  modules: {
    identity: true,
  },
};

export default tinkernet;
