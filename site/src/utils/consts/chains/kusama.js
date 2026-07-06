import KusamaIcon from "../../../components/icons/kusamaIcon";
import { governanceModules, treasuryModules } from "./modules";
import { kusamaColor } from "./common";

const kusama = {
  name: "Kusama",
  icon: <KusamaIcon />,
  identity: "kusama",
  sub: "kusama",
  value: "kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  ss58Format: 2,
  ...kusamaColor,
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: true,
    multisig: true,
    vestings: true,
    // recovery: true,
    proxy: true,
  },
  treasuryWebsite: "https://kusama.dotreasury.com",
  subSquareWebsite: "https://kusama.subsquare.io",
  nodes: [
    { name: "Allnodes", url: "wss://kusama-rpc.publicnode.com" },
    { name: "Dwellir", url: "wss://kusama-rpc.n.dwellir.com" },
    { name: "Helixstreet", url: "wss://rpc-kusama.helixstreet.io" },
    { name: "LuckyFriday", url: "wss://rpc-kusama.luckyfriday.io" },
    { name: "OnFinality", url: "wss://kusama.api.onfinality.io/public-ws" },
    { name: "Parity", url: "wss://kusama-rpc.polkadot.io" },
    {
      name: "Spectrum",
      url: "wss://spectrum-03.simplystaking.xyz/cG9sa2Fkb3QtMDMtOTFkMmYwZGYtcG9sa2Fkb3Q/QXq7QZ6Q60NDzA/kusama/mainnet/",
    },
  ],
  useOnChainBlockData: true,
};

export default kusama;
