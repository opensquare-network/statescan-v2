import { ReactComponent as CoretimePaseo } from "../../../components/icons/coretime-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/coretime-paseo",
  },
  {
    name: "IBP2",
    url: "wss://coretime-paseo.dotters.network/",
  },
  {
    name: "ParaNodes",
    url: "wss://paseo-coretime.paranodes.io/",
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
