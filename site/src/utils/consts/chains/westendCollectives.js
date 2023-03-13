import WestendCollectivesIcon from "../../../components/icons/westendCollectivesIcon";
import { governanceModules } from "./modules";

const westendCollectives = {
  name: "Collectives",
  icon: <WestendCollectivesIcon />,
  identity: "westend",
  value: "westend-collectives",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  color: "#E6777A",
  colorSecondary: "rgba(230, 119, 122, 0.1)",
  buttonColor: "#E6777A",
  para: {
    relay: "Westend",
    id: "1001",
  },
  modules: {
    ...governanceModules,
  },
  subSquareWebsite: "https://westend-collectives.subsquare.io",
};

export default westendCollectives;
