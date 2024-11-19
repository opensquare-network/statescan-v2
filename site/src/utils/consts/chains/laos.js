import { ReactComponent as LaosIcon } from "../../../components/icons/laos.svg";

const nodes = [
  {
    name: "freeverse.io",
    url: "wss://rpc.laos.laosfoundation.io/",
  },
];

const laos = {
  name: "Laos",
  icon: <LaosIcon />,
  identity: "laos",
  value: "laos",
  chain: "polkadot",
  symbol: "LAOS",
  decimals: 18,
  color: "#8033CE",
  colorSecondary: "rgba(128, 51, 206, 0.1)",
  nodes,
  useOnChainBlockData: true,
  modules: {
    identity: true,
  },
};

export default laos;
