import { ReactComponent as Nexus } from "../../../components/icons/nexus.svg";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Polytope Labs",
    url: "wss://nexus.rpc.polytope.technology",
  },
];

const nexus = {
  name: "Nexus",
  icon: <Nexus />,
  identity: "polkadot",
  chain: "polkadot",
  value: "nexus",
  symbol: "BRIDGE",
  decimals: 12,
  ss58Format: 0,
  color: "#E13D90",
  colorSecondary: "rgba(225,61,144, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default nexus;
