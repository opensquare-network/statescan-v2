import WestendCollectivesIcon from "../../../components/icons/westendCollectivesIcon";
import { westendCommon } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/collectives-westend",
  },
  {
    name: "Parity",
    url: "wss://westend-collectives-rpc.polkadot.io",
  },
  {
    name: "IBP2",
    url: "wss://collectives-westend.dotters.network",
  },
  {
    name: "Dwellir",
    url: "wss://collectives-westend-rpc.dwellir.com",
  },
  {
    name: "Dwellir Tunisia",
    url: "wss://westend-collectives-rpc-tn.dwellir.com",
  },
];

const collectivesWestend = {
  name: "Collectives",
  icon: <WestendCollectivesIcon />,
  identity: "westend",
  value: "westend-collectives",
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
