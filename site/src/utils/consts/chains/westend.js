import { ReactComponent as Westend } from "../../../components/icons/westend.svg";
import { westendCommon } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://westend-rpc.polkadot.io/",
  },
  {
    name: "OnFinality",
    url: "wss://westend.api.onfinality.io/public-ws",
  },
  {
    name: "Dwellir Tunisia",
    url: "wss://westend-rpc-tn.dwellir.com/",
  },
  {
    name: "Dwellir",
    url: "wss://westend-rpc.dwellir.com/",
  },
  {
    name: "RadiumBlock",
    url: "wss://westend.public.curie.radiumblock.co/ws",
  },
];

const westend = {
  name: "Westend",
  icon: <Westend />,
  identity: "westend",
  chain: "westend",
  value: "westend",
  symbol: "WND",
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
  disabledMenus: ["calls"],
};

export default westend;
