import PolkadotCollectivesIcon from "../../../components/icons/polkadotCollectivesIcon";
import { governanceModules } from "./modules";

const collectives = {
  name: "Collectives",
  icon: <PolkadotCollectivesIcon />,
  identity: "polkadot",
  value: "collectives",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  color: "#E6777A",
  colorSecondary: "rgba(230, 119, 122, 0.1)",
  buttonColor: "#E6777A",
  para: {
    relay: "Polkadot",
    id: "1001",
  },
  modules: {
    ...governanceModules,
  },
  subSquareWebsite: "https://collectives.subsquare.io",
};

export default collectives;
