import { ReactComponent as PeopleKusama } from "../../../components/icons/people-kusama.svg";
import { kusamaColor } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://kusama-people-rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://people-kusama.api.onfinality.io/public-ws",
  },
  {
    name: "Dwellir",
    url: "wss://people-kusama-rpc.n.dwellir.com",
  },
  {
    name: "LuckyFriday",
    url: "wss://rpc-people-kusama.luckyfriday.io",
  },
  {
    name: "Stakeworld",
    url: "wss://ksm-rpc.stakeworld.io/people",
  },
  {
    name: "Helixstreet",
    url: "wss://rpc-people-kusama.helixstreet.io",
  },
];

const peopleKusama = {
  name: "People",
  icon: <PeopleKusama />,
  identity: "kusama",
  value: "people-kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  ...kusamaColor,
  buttonColor: "#3765DC",
  nodes,
  useOnChainBlockData: true,
};

export default peopleKusama;
