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
    identity: true,
    multisig: true,
  },
  treasuryWebsite: "https://kusama.dotreasury.com",
  subSquareWebsite: "https://kusama.subsquare.io",
  nodes: [
    { name: "Dwellir", url: "wss://kusama-rpc.dwellir.com" },
    { name: "Automata 1RPC", url: "wss://1rpc.io/ksm" },
    { name: "Dwellir Tunisia", url: "wss://kusama-rpc-tn.dwellir.com" },
    { name: "IBP-GeoDNS1", url: "wss://rpc.ibp.network/kusama" },
    { name: "IBP-GeoDNS2", url: "wss://rpc.dotters.network/kusama" },
    { name: "LuckyFriday", url: "wss://rpc-kusama.luckyfriday.io" },
    { name: "OnFinality", url: "wss://kusama.api.onfinality.io/public-ws" },
    { name: "RadiumBlock", url: "wss://kusama.public.curie.radiumblock.co/ws" },
    { name: "Stakeworld", url: "wss://ksm-rpc.stakeworld.io" },
  ],
  useOnChainBlockData: true,
};

export default kusama;
