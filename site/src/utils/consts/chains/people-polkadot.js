import { ReactComponent as PeoplePolkadot } from "../../../components/icons/people-polkadot.svg";
import { polkadotColor } from "./common";

const nodes = [
  {
    name: "OnFinality",
    url: "wss://people-polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-people-polkadot.luckyfriday.io",
  },
  {
    name: "Parity",
    url: "wss://polkadot-people-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://people-polkadot-rpc.n.dwellir.com",
  },
  {
    name: "Stakeworld",
    url: "wss://dot-rpc.stakeworld.io/people",
  },
];

const peoplePolkadot = {
  name: "People",
  icon: <PeoplePolkadot />,
  identity: "polkadot",
  value: "people-polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  ...polkadotColor,
  nodes,
  useOnChainBlockData: true,
};

export default peoplePolkadot;
