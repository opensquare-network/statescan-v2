import { ReactComponent as AssethubPaseo } from "../../../components/icons/assethub-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "IBP1",
    url: "wss://sys.ibp.network/asset-hub-paseo",
  },
  {
    name: "IBP2",
    url: "wss://asset-hub-paseo.dotters.network/",
  },
  {
    name: "StakeWorld",
    url: "wss://pas-rpc.stakeworld.io/assethub",
  },
  {
    name: "Dwellir",
    url: "wss://asset-hub-paseo-rpc.dwellir.com/",
  },
  {
    name: "TurboFlakes",
    url: "wss://sys.turboflakes.io/asset-hub-paseo",
  },
];

const assethubPaseo = {
  name: "AssetHub",
  icon: <AssethubPaseo />,
  identity: "paseo",
  value: "assethub-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
};

export default assethubPaseo;
