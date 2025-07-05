import { ReactComponent as BridgehubPolkadotIcon } from "../../../components/icons/bridgehub-polkadot.svg";

const nodes = [
  {
    name: "Parity",
    url: "wss://polkadot-bridge-hub-rpc.polkadot.io",
  },
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/bridgehub-polkadot",
  },
  {
    name: "OnFinality",
    url: "wss://bridgehub-polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "Dwellir",
    url: "wss://bridge-hub-polkadot-rpc.dwellir.com",
  },
  {
    name: "Dwellir Tunisia",
    url: "wss://polkadot-bridge-hub-rpc-tn.dwellir.com",
  },
  {
    name: "IBP2",
    url: "wss://sys.dotters.network/bridgehub-polkadot",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-bridge-hub-polkadot.luckyfriday.io",
  },
  {
    name: "Stakeworld",
    url: "wss://dot-rpc.stakeworld.io/bridgehub",
  },
  {
    name: "RadiumBlock",
    url: "wss://bridgehub-polkadot.public.curie.radiumblock.co/ws",
  },
];

const bridgehubPolkadot = {
  name: "Bridgehub",
  icon: <BridgehubPolkadotIcon />,
  identity: "polkadot",
  value: "bridgehub-polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  color: "#E6007A",
  colorSecondary: "rgba(230, 0, 122, 0.1)",
  buttonColor: "#E6007A",
  nodes,
  useOnChainBlockData: true,
  disabledMenus: ["calls"],
};

export default bridgehubPolkadot;
