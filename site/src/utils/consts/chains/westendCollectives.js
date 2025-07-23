import WestendCollectivesIcon from "../../../components/icons/westendCollectivesIcon";
import { collectivesModules } from "./collectives";

const westendCollectives = {
  name: "Collectives",
  icon: <WestendCollectivesIcon />,
  identity: "westend",
  value: "westend-collectives",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  color: "#E6777A",
  colorSecondary: "rgba(230, 119, 122, 0.1)",
  buttonColor: "#E6777A",
  modules: collectivesModules,
  para: {
    relay: "Westend",
    id: "1001",
  },
  nodes: [
    {
      name: "Parity",
      url: "wss://westend-collectives-rpc.polkadot.io/",
    },
    {
      name: "Dwellir",
      url: "wss://westend-collectives-rpc.dwellir.com",
    },
    {
      name: "Dwellir Tunisia",
      url: "wss://westend-collectives-rpc-tn.dwellir.com",
    },
  ],
  useOnChainBlockData: true,
};

export default westendCollectives;
