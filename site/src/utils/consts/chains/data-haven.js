import { ReactComponent as DataHavenIcon } from "../../../components/icons/dataHaven.svg";

const nodes = [
  {
    name: "Frequency 0",
    url: "wss://0.rpc.frequency.xyz",
  },
  {
    name: "Frequency 1",
    url: "wss://1.rpc.frequency.xyz",
  },
  {
    name: "OnFinality",
    url: "wss://frequency-polkadot.api.onfinality.io/public-ws",
  },
];

const dataHaven = {
  name: "DataHaven Testnet",
  icon: <DataHavenIcon />,
  value: "data-haven",
  symbol: "DH",
  decimals: 8,
  ss58Format: 90,
  color: "#2A1605",
  colorSecondary: "#2a16051a",
  nodes,
  useOnChainBlockData: true,
};

export default dataHaven;
