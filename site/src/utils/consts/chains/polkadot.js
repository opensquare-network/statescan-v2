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
  chainIcon: "originalPolkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  logo: "logo-img-2",
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: true,
    multisig: true,
  },
  treasuryWebsite: "https://polkadot.dotreasury.com",
  subSquareWebsite: "https://polkadot.subsquare.io",
  nodes: [
    { name: "Dwellir", url: "wss://polkadot-rpc.dwellir.com" },
    { name: "Automata 1RPC", url: "wss://1rpc.io/dot" },
    { name: "Dwellir Tunisia", url: "wss://polkadot-rpc-tn.dwellir.com" },
    { name: "IBP-GeoDNS1", url: "wss://rpc.ibp.network/polkadot" },
    { name: "IBP-GeoDNS2", url: "wss://rpc.dotters.network/polkadot" },
    { name: "LuckyFriday", url: "wss://rpc-polkadot.luckyfriday.io" },
    { name: "OnFinality", url: "wss://polkadot.api.onfinality.io/public-ws" },
    {
      name: "RadiumBlock",
      url: "wss://polkadot.public.curie.radiumblock.co/ws",
    },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io" },
  ],
  useOnChainBlockData: true,
};

export default polkadot;
