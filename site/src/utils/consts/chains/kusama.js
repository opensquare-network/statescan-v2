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
    { name: "Parity", url: "wss://kusama-rpc.polkadot.io" },
    { name: "OnFinality", url: "wss://kusama.api.onfinality.io/public-ws" },
    { name: "Allnodes", url: "wss://kusama-rpc.publicnode.com" },
    { name: "LuckyFriday", url: "wss://rpc-kusama.luckyfriday.io" },
    { name: "Dwellir", url: "wss://kusama-rpc.n.dwellir.com" },
    { name: "RadiumBlock", url: "wss://kusama.public.curie.radiumblock.co/ws" },
    { name: "Stakeworld", url: "wss://ksm-rpc.stakeworld.io" },
  ],
  useOnChainBlockData: true,
};

export default kusama;
