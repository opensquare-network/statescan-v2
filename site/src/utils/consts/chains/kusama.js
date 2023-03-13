import KusamaIcon from "../../../components/icons/kusamaIcon";
import { governanceModules, treasuryModules } from "./modules";

const kusama = {
  name: "Kusama",
  icon: <KusamaIcon />,
  identity: "kusama",
  sub: "kusama",
  value: "kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  color: "#3765DC",
  colorSecondary: "rgba(55, 101, 220, 0.1)",
  buttonColor: "#000000",
  modules: {
    ...treasuryModules,
    ...governanceModules,
  },
  treasuryWebsite: "https://www.dotreasury.com/ksm",
  subSquareWebsite: "https://kusama.subsquare.io",
};

export default kusama;
