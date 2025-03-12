import { westendCommon } from "./common";

const nodes = [
  {
    name: "Parity",
    url: "wss://westend-asset-hub-next-rpc.parity-chains-scw.parity.io/",
  },
];

const assethubNextWestend = {
  name: "AssetHub Next",
  value: "assethub-next-westend",
  chain: "westend",
  symbol: "WND",
  ...westendCommon,
  nodes,
  useOnChainBlockData: true,
};

export default assethubNextWestend;
