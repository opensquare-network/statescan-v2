import { ReactComponent as Nexus } from "../../../components/icons/nexus.svg";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "BlockOps",
    url: "wss://hyperbridge-nexus-rpc.blockops.network/",
  },
  {
    name: "IBP1",
    url: "wss://nexus.ibp.network/",
  },
  {
    name: "IBP2",
    url: "wss://nexus.dotters.network/",
  },
];

const nexus = {
  name: "Nexus",
  icon: <Nexus />,
  identity: "polkadot",
  chain: "polkadot",
  value: "nexus",
  symbol: "NAND",
  decimals: 12,
  color: "#E13D90",
  colorSecondary: "rgba(225,61,144, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default nexus;
