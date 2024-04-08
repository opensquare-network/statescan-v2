import { ReactComponent as Parallel } from "../../../components/icons/parallel.svg";

const nodes = [
  {
    name: "Dwellir",
    url: "wss://parallel-rpc.dwellir.com/",
  },
];

const parallel = {
  name: "Parallel",
  icon: <Parallel />,
  identity: "parallel",
  value: "parallel",
  chain: "polkadot",
  symbol: "PARA",
  decimals: 12,
  color: "#7578FB",
  colorSecondary: "rgba(117,120,251, 0.1)",
  nodes,
  useOnChainBlockData: true,
  modules: {
    identity: true,
  },
};

export default parallel;
