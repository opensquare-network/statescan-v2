import { ReactComponent as PeopleWestend } from "../../../components/icons/people-westend.svg";
import { polkadotColor, westendColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/people-westend",
  },
  {
    name: "IBP2",
    url: "wss://people-westend.dotters.network",
  },
  {
    name: "Parity",
    url: "wss://westend-people-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://people-westend-rpc.dwellir.com",
  },
];

const peopleWestend = {
  name: "People",
  icon: <PeopleWestend />,
  identity: "westend",
  value: "people-westend",
  chain: "westend",
  symbol: "WND",
  decimals: 10,
  ...westendColor,
  nodes,
  useOnChainBlockData: true,
};

export default peopleWestend;
