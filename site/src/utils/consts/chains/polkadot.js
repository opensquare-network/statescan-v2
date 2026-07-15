import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";
import { governanceModules, treasuryModules } from "./modules";
import { polkadotColor } from "./common";

const polkadot = {
  name: "Polkadot",
  icon: <Polkadot />,
  identity: "polkadot",
  sub: "polkadot",
  value: "polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  ss58Format: 0,
  chainIcon: "originalPolkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: true,
    multisig: true,
    vestings: true,
    proxy: true,
    staking: {
      rewards: true,
    },
  },
  treasuryWebsite: "https://polkadot.dotreasury.com",
  subSquareWebsite: "https://polkadot.subsquare.io",
  nodes: [
    { name: "Allnodes", url: "wss://polkadot-rpc.publicnode.com" },
    { name: "Dwellir", url: "wss://polkadot-rpc.n.dwellir.com" },
    { name: "Helixstreet", url: "wss://rpc-polkadot.helixstreet.io" },
    { name: "interweb", url: "wss://rpc.interweb-it.com/polkadot" },
    { name: "LuckyFriday", url: "wss://rpc-polkadot.luckyfriday.io" },
    { name: "OnFinality", url: "wss://polkadot.api.onfinality.io/public-ws" },
    { name: "Parity", url: "wss://rpc.polkadot.io" },
    {
      name: "Spectrum",
      url: "wss://spectrum-03.simplystaking.xyz/cG9sa2Fkb3QtMDMtOTFkMmYwZGYtcG9sa2Fkb3Q/LjwBJpV3dIKyWQ/polkadot/mainnet/",
    },
    { name: "SubQuery", url: "wss://polkadot.rpc.subquery.network/public/ws" },
  ],
  useOnChainBlockData: true,
};

export default polkadot;
