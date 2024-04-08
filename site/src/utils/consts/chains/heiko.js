import { ReactComponent as Parallel } from "../../../components/icons/parallel.svg";

const nodes = [
  {
    name: "Parallel",
    url: "wss://heiko-rpc.parallel.fi/",
  },
];

const heiko = {
  name: "Heiko",
  icon: <Parallel />,
  identity: "heiko",
  value: "heiko",
  chain: "kusama",
  symbol: "HKO",
  decimals: 12,
  color: "#ED8C3B",
  colorSecondary: "rgba(237,140,59, 0.1)",
  nodes,
  useOnChainBlockData: true,
  modules: {
    identity: true,
  },
};

export default heiko;
