import { ReactComponent as BridgehubKusamaIcon } from "../../../components/icons/bridgehub-kusama.svg";

const nodes = [
  {
    name: "Parity",
    url: "wss://kusama-bridge-hub-rpc.polkadot.io",
  },
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/bridgehub-kusama",
  },
  {
    name: "Dwellir",
    url: "wss://bridge-hub-kusama-rpc.dwellir.com",
  },
  {
    name: "Dwellir Tunisia",
    url: "wss://kusama-bridge-hub-rpc-tn.dwellir.com",
  },
  {
    name: "IBP2",
    url: "wss://sys.dotters.network/bridgehub-kusama",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-bridge-hub-kusama.luckyfriday.io",
  },
  {
    name: "Stakeworld",
    url: "wss://ksm-rpc.stakeworld.io/bridgehub",
  },
  {
    name: "RadiumBlock",
    url: "wss://bridgehub-kusama.public.curie.radiumblock.co/ws",
  },
];

const bridgehubKusama = {
  name: "Bridgehub Kusama",
  icon: <BridgehubKusamaIcon />,
  identity: "kusama",
  value: "bridgehub-kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  color: "#3765DC",
  colorSecondary: "rgb(55, 101, 220, 0.1)",
  buttonColor: "#3765DC",
  nodes,
  useOnChainBlockData: true,
};

export default bridgehubKusama;
