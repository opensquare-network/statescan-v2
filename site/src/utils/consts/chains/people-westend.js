import { ReactComponent as PeopleWestend } from "../../../components/icons/people-westend.svg";
import { westendCommon } from "./common";

const nodes = [
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
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
  para: {
    relay: "Westend",
    id: "1004",
  },
};

export default peopleWestend;
