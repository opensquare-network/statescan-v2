import { ReactComponent as PeoplePaseo } from "../../../components/icons/people-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "Amforc",
    url: "wss://people-paseo.rpc.amforc.com",
  },
  {
    name: "Zondax",
    url: "wss://api2.zondax.ch/pas/people/node/rpc",
  },
];

const peoplePaseo = {
  name: "People",
  icon: <PeoplePaseo />,
  identity: "paseo",
  value: "people-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
};

export default peoplePaseo;
