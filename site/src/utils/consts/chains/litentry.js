import { ReactComponent as Heima } from "../../../components/icons/heima.svg";
import { litentryBlockHeightSettings } from "./blockHeightSettings/litentry";
import { governanceModules } from "./modules";

const litentry = {
  name: "Heima",
  icon: <Heima />,
  identity: "polkadot",
  domain: "heima",
  sub: "litentry",
  value: "litentry",
  chain: "polkadot",
  symbol: "HEI",
  decimals: 18,
  ss58Format: 31,
  chainIcon: "litentry",
  color: "#016B71",
  colorSecondary: "016B711A",
  buttonColor: "#1CC776",
  para: {
    relay: "Polkadot",
    id: "2013",
  },
  modules: {
    ...governanceModules,
    governance: {
      treasury: {
        proposal: true,
        bounties: true,
      },
    },
    multisig: true,
  },
  subSquareWebsite: "https://heima.subsquare.io",
  nodes: [
    { name: "Heima", url: "wss://rpc.heima-parachain.heima.network/" },
    { name: "Dwellir", url: "wss://heima-rpc.n.dwellir.com/" },
  ],
  useOnChainBlockData: true,
  blockHeightSettings: litentryBlockHeightSettings,
};

export default litentry;
