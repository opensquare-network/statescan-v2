import { ReactComponent as BridgehubPaseo } from "../../../components/icons/bridegehub-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/bridgehub-paseo",
  },
  {
    name: "IBP2",
    url: "wss://bridge-hub-paseo.dotters.network/",
  },
];

const bridgehubPaseo = {
  name: "Coretime",
  icon: <BridgehubPaseo />,
  identity: "paseo",
  value: "bridgehub-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
};

export default bridgehubPaseo;
