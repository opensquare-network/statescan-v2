import GargantuaIcon from "../../../components/icons/gargantuaIcon";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Paseo",
    url: "wss://hyperbridge-paseo-rpc.blockops.network/",
  },
];

const gargantua = {
  name: "Gargantua",
  icon: <GargantuaIcon />,
  identity: "rococo",
  chain: "paseo",
  value: "gargantua",
  symbol: "tNAND",
  decimals: 12,
  ss58Format: 0,
  color: "#E13D90",
  colorSecondary: "rgba(225,61,144, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default gargantua;
