import TangleIcon from "../../../components/icons/tangleIcon";

const nodes = [
  {
    name: "Webb",
    url: "wss://testnet-rpc.tangle.tools/",
  },
];

const tangleTestnet = {
  name: "Tangle Testnet",
  icon: <TangleIcon />,
  value: "tangle-testnet",
  symbol: "tTNT",
  decimals: 18,
  color: "#7578FB",
  colorSecondary: "rgba(117,120,251, 0.1)",
  modules: {
    identity: true,
  },
  nodes,
  useOnChainBlockData: false,
};

export default tangleTestnet;
