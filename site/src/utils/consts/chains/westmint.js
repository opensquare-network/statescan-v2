import WestmintIcon from "../../../components/icons/westmintIcon";
import { assetChainModules } from "./assetChain";

const westmint = {
  name: "Westmint",
  icon: <WestmintIcon />,
  identity: "westend",
  sub: "westend",
  value: "westmint",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  chainIcon: "westend",
  color: "#DA68A7",
  colorSecondary: "rgba(218, 104, 167, 0.1)",
  buttonColor: "#DA68A7",
  modules: assetChainModules,
  para: {
    relay: "Westend",
    id: "1000",
  },
};

export default westmint;
