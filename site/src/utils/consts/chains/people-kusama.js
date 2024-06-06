import { ReactComponent as PeopleKusama } from "../../../components/icons/people-kusama.svg";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/people-kusama",
  },
  {
    name: "IBP2",
    url: "wss://sys.dotters.network/people-kusama",
  },
  {
    name: "Parity",
    url: "wss://kusama-people-rpc.polkadot.io",
  },
  {
    name: "Stakeworld",
    url: "wss://ksm-rpc.stakeworld.io/people",
  },
];

const peopleKusama = {
  name: "People Kusama",
  icon: <PeopleKusama />,
  identity: "kusama",
  value: "people-kusama",
  chain: "kusama",
  symbol: "KSM",
  decimals: 12,
  color: "#3765DC",
  colorSecondary: "rgba(55, 101, 220, 0.1)",
  buttonColor: "#3765DC",
  nodes,
  useOnChainBlockData: true,
};

export default peopleKusama;
