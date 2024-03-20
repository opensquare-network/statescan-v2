import GargantuaIcon from "../../../components/icons/gargantuaIcon";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Gargantua",
    url: "wss://hyperbridge-gargantua-rpc.blockops.network/",
  },
];

const gargantua = {
  name: "Gargantua",
  icon: <GargantuaIcon />,
  identity: "rococo",
  chain: "rococo",
  value: "gargantua",
  symbol: "TNAND",
  decimals: 12,
  color: "#E13D90",
  colorSecondary: "rgba(225,61,144, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default gargantua;
