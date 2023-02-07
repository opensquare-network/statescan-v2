import { assetChainModules } from "./assetChain";

const statemine = {
  name: "Statemine",
  identity: "kusama",
  sub: "kusama",
  value: "statemine",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  chainIcon: "kusama",
  color: "#3765DC",
  colorSecondary: "rgba(55, 101, 220, 0.1)",
  buttonColor: "#000000",
  logo: "logo-img-2",
  modules: assetChainModules,
  para: {
    relay: "Kusama",
    id: "1000",
  },
};

export default statemine;
