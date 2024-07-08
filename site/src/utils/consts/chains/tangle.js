import TangleIcon from "../../../components/icons/tangleIcon";

const nodes = [
  {
    name: "Webb",
    url: "wss://rpc.tangle.tools/",
  },
  {
    name: "Dwellir",
    url: "wss://tangle-mainnet-rpc.dwellir.com/",
  },
];

const tangle = {
  name: "Tangle",
  icon: <TangleIcon />,
  value: "tangle",
  symbol: "TNT",
  decimals: 18,
  color: "#7578FB",
  colorSecondary: "rgba(117,120,251, 0.1)",
  modules: {
    identity: true,
  },
  nodes,
  useOnChainBlockData: true,
};

export default tangle;
