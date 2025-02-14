import { ReactComponent as PeoplePaseo } from "../../../components/icons/people-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "Amforc",
    url: "wss://people-paseo.rpc.amforc.com/",
  },
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/people-paseo",
  },
  {
    name: "IBP2",
    url: "wss://people-paseo.dotters.network/",
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
