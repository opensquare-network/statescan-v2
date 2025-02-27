import { ReactComponent as BridgehubWestend } from "../../../components/icons/bridegehub-westend.svg";
import { westendColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/bridgehub-westend",
  },
  {
    name: "IBP2",
    url: "wss://bridge-hub-westend.dotters.network",
  },
  {
    name: "Parity",
    url: "wss://westend-bridge-hub-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://bridge-hub-westend-rpc.dwellir.com",
  },
  {
    name: "Dwellir Tunisia",
    url: "wss://westend-bridge-hub-rpc-tn.dwellir.com",
  },
];

const bridgehubWestend = {
  name: "Bridgehub",
  icon: <BridgehubWestend />,
  identity: "westend",
  value: "bridgehub-westend",
  chain: "westend",
  symbol: "WND",
  decimals: 10,
  ...westendColor,
  nodes,
  useOnChainBlockData: true,
};

export default bridgehubWestend;
