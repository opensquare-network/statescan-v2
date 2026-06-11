import { ReactComponent as CoretimePaseo } from "../../../components/icons/coretime-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "Zondax",
    url: "wss://api2.zondax.ch/pas/coretime/node/rpc",
  },
];

const coretimePaseo = {
  name: "Coretime",
  icon: <CoretimePaseo />,
  identity: "paseo",
  value: "coretime-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
};

export default coretimePaseo;
