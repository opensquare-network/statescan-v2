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
  symbol: "HAVE",
  decimals: 18,
  color: "#2A1605",
  colorSecondary: "rgba(42, 22, 5, 0.1)",
  customTheme: {
    light: {
      theme500: "#2A1605",
      theme100: "rgba(42, 22, 5, 0.1)",
    },
    dark: {
      theme500: "#FFFFFF",
      theme100: "rgba(255, 255, 255, 0.1)",
      fontButtonTag: "#2A1605",
    },
  },
  nodes,
  useOnChainBlockData: true,
};

export default datahavenTestnet;
