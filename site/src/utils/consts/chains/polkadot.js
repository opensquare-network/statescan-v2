import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";
import { governanceModules, treasuryModules } from "./modules";

const polkadot = {
  name: "Polkadot",
  icon: <Polkadot />,
  identity: "polkadot",
  sub: "polkadot",
  value: "polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  chainIcon: "originalPolkadot",
  color: "#E6007A",
  colorSecondary: "rgba(230, 0, 122, 0.1)",
  buttonColor: "#E6007A",
  logo: "logo-img-2",
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: true,
  },
  treasuryWebsite: "https://www.dotreasury.com/dot",
  subSquareWebsite: "https://polkadot.subsquare.io",
};

export default polkadot;
