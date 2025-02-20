import { ReactComponent as Westend } from "../../../components/icons/westend.svg";

const nodes = [
  {
    name: "IBP1",
    url: "wss://rpc.ibp.network/westend",
  },
  {
    name: "Parity",
    url: "wss://westend-rpc.polkadot.io/",
  },
  {
    name: "IBP2",
    url: "wss://westend.dotters.network/",
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
  decimals: 12,
  nodes,
  useOnChainBlockData: true,
};

export default westend;
