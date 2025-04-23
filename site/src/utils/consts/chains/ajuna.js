import { ReactComponent as Ajuna } from "../../../components/icons/ajuna.svg";

const nodes = [
  {
    name: "IBP1",
    url: "wss://ajuna.ibp.network/",
  },
  {
    name: "Ajuna",
    url: "wss://rpc-para.ajuna.network/",
  },
  {
    name: "IBP2",
    url: "wss://ajuna.dotters.network/",
  },
];

const ajuna = {
  name: "Ajuna",
  icon: <Ajuna />,
  identity: "ajuna",
  value: "ajuna",
  chain: "polkadot",
  symbol: "AJUN",
  decimals: 12,
  nodes,
  color: "#166CB7",
  colorSecondary: "rgba(22, 108, 183, 0.1)",
  useOnChainBlockData: true,
};

export default ajuna;
