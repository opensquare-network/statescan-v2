import { ReactComponent as CereTestnet } from "../../../components/icons/cere-testnet.svg";

const nodes = [
  {
    name: "Cere",
    url: "wss://archive.testnet.cere.network/ws",
  },
];

const cereTestnet = {
  name: "Cere Testnet",
  icon: <CereTestnet />,
  value: "cere-testnet",
  symbol: "CERE",
  decimals: 10,
  nodes,
  color: "#AA44F3",
  colorSecondary: "rgba(170, 68, 243, 0.1)",
  useOnChainBlockData: true,
};

export default cereTestnet;
