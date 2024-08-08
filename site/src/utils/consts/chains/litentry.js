import { ReactComponent as Litentry } from "../../../components/icons/litentry.svg";
import { litentryBlockHeightSettings } from "./blockHeightSettings/litentry";
import { governanceModules } from "./modules";

const litentry = {
  name: "Litentry",
  icon: <Litentry />,
  identity: "polkadot",
  sub: "litentry",
  value: "litentry",
  chain: "polkadot",
  symbol: "LIT",
  decimals: 12,
  chainIcon: "litentry",
  color: "#1CC776",
  colorSecondary: "rgba(28, 199, 118, 0.1)",
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
  subSquareWebsite: "https://litentry.subsquare.io",
  nodes: [
    { name: "Litentry", url: "wss://rpc.litentry-parachain.litentry.io" },
    { name: "Dwellir", url: "wss://litentry-rpc.dwellir.com" },
  ],
  useOnChainBlockData: true,
  blockHeightSettings: litentryBlockHeightSettings,
};

export default litentry;
