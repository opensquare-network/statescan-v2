import { ReactComponent as Fintra } from "../../../components/icons/fintra.svg";

const nodes = [
  {
    name: "Fintra",
    url: "wss://testnet.fintra.network",
  },
];

const fintraTestnet = {
  name: "Fintra Testnet",
  icon: <Fintra />,
  value: "fintra-testnet",
  chain: "paseo",
  symbol: "Fintra",
  decimals: 12,
  nodes,
  color: "#3798D4",
  colorSecondary: "rgba(55, 152, 212, 0.1)",
  // colorSecondary: "#D8E8EF",
  useOnChainBlockData: true,
};

export default fintraTestnet;
