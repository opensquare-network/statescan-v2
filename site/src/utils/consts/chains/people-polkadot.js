import { ReactComponent as PeoplePolkadot } from "../../../components/icons/people-polkadot.svg";
import { polkadotColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/people-polkadot",
  },
  {
    name: "IBP2",
    url: "wss://people-polkadot.dotters.network/",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-people-polkadot.luckyfriday.io/",
  },
  {
    name: "Parity",
    url: "wss://polkadot-people-rpc.polkadot.io/",
  },
  {
    name: "RadiumBlock",
    url: "wss://people-polkadot.public.curie.radiumblock.co/ws",
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
