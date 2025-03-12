import { ReactComponent as Cere } from "../../../components/icons/cere.svg";

const nodes = [
  {
    name: "Cere",
    url: "wss://archive.mainnet.cere.network/ws",
  },
];

const cere = {
  name: "Cere",
  icon: <Cere />,
  value: "cere",
  symbol: "CERE",
  decimals: 10,
  nodes,
  color: "#403DFF",
  colorSecondary: "rgba(64, 61, 255, 0.1)",
  useOnChainBlockData: true,
};

export default cere;
