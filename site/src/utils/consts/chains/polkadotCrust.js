import CrustIcon from "../../../components/icons/crustIcon";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Crust",
    url: "wss://crust-parachain.crustapps.net/",
  },
];

const polkadotCrust = {
  name: "Crust",
  icon: <CrustIcon />,
  identity: "crust",
  chain: "polkadot",
  value: "polkadot-crust-parachain",
  symbol: "CRU",
  decimals: 12,
  color: "#FA8C16",
  colorSecondary: "rgba(250,140,22, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default polkadotCrust;
