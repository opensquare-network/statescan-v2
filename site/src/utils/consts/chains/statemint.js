import Statemint from "../../../components/icons/statemintIcon";
import { assetChainModules } from "./assetChain";

const statemint = {
  name: "Statemint",
  icon: <Statemint />,
  identity: "polkadot",
  sub: "polkadot",
  value: "statemint",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  chainIcon: "polkadot",
  color: "#E6007A",
  colorSecondary: "rgba(230, 0, 122, 0.1)",
  buttonColor: "#E6007A",
  hidden: false,
  modules: assetChainModules,
  para: {
    relay: "Polkadot",
    id: "1000",
  },
};

export default statemint;
