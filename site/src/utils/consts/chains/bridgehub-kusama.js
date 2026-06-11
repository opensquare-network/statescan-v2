import { ReactComponent as BridgehubKusamaIcon } from "../../../components/icons/bridgehub-kusama.svg";

const nodes = [
  {
    name: "Parity",
    url: "wss://kusama-bridge-hub-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://bridge-hub-kusama-rpc.n.dwellir.com",
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
  name: "Bridgehub",
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
  disabledMenus: ["calls"],
};

export default bridgehubKusama;
