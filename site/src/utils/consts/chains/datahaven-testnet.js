import { ReactComponent as DataHavenIcon } from "../../../components/icons/dataHaven.svg";

const nodes = [
  {
    name: "DataHaven",
    url: "wss://services.datahaven-testnet.network/testnet",
  },
];

const datahavenTestnet = {
  name: "DataHaven Testnet",
  icon: <DataHavenIcon />,
  value: "datahaven-testnet",
  symbol: "MOCK",
  decimals: 18,
  color: "#2A1605",
  colorSecondary: "rgba(42, 22, 5, 0.1)",
  nodes,
  useOnChainBlockData: true,
};

export default datahavenTestnet;
