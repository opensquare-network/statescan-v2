import { ReactComponent as HydraDX } from "../../../components/icons/hydradx.svg";
import { polkadotColor } from "./common";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Galactic Council",
    url: "wss://rpc.nice.hydration.cloud/",
  },
];

const hydradxTestnet = {
  name: "HydraDX",
  icon: <HydraDX />,
  identity: "hydradx",
  value: "hydradx-testnet",
  symbol: "HDX",
  decimals: 12,
  ...polkadotColor,
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default hydradxTestnet;
