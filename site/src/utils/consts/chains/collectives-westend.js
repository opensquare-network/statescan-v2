import WestendCollectivesIcon from "../../../components/icons/westendCollectivesIcon";
import { westendCommon } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://westend-collectives-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://collectives-westend-rpc.n.dwellir.com",
  },
];

const collectivesWestend = {
  name: "Collectives",
  icon: <WestendCollectivesIcon />,
  identity: "westend",
  value: "collectives-westend",
  chain: "westend",
  symbol: "WND",
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
  para: {
    relay: "Westend",
    id: "1001",
  },
};

export default collectivesWestend;
