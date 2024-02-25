import ShadowIcon from "../../../components/icons/shadowIcon";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Crust",
    url: "wss://rpc-shadow.crust.network/",
  },
];

const shadow = {
  name: "Shadow",
  icon: <ShadowIcon />,
  identity: "shadow",
  chain: "kusama",
  value: "shadow",
  symbol: "CSM",
  decimals: 12,
  color: "#FA8C16",
  colorSecondary: "rgba(250,140,22, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default shadow;
