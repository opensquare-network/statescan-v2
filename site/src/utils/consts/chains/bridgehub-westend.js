import { ReactComponent as BridgehubWestend } from "../../../components/icons/bridegehub-westend.svg";
import { westendCommon } from "./common";

const nodes = [
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
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
  disabledMenus: ["calls"],
};

export default bridgehubWestend;
