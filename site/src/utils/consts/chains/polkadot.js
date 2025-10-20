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
    { name: "IBP1", url: "wss://rpc.ibp.network/polkadot" },
    { name: "OnFinality", url: "wss://polkadot.api.onfinality.io/public-ws" },
    { name: "LuckyFriday", url: "wss://rpc-polkadot.luckyfriday.io" },
    { name: "IBP2", url: "wss://polkadot.dotters.network" },
    { name: "Dwellir", url: "wss://polkadot-rpc.n.dwellir.com" },
    { name: "Dwellir Tunisia", url: "wss://polkadot-rpc-tn.dwellir.com" },
    { name: "Permanence DAO EU", url: "wss://polkadot.rpc.permanence.io" },
    {
      name: "RadiumBlock",
      url: "wss://polkadot.public.curie.radiumblock.co/ws",
    },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io" },
  ],
  useOnChainBlockData: true,
};

export default polkadot;
