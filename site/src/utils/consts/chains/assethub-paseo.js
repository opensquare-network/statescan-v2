import { ReactComponent as AssethubPaseo } from "../../../components/icons/assethub-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "StakeWorld",
    url: "wss://pas-rpc.stakeworld.io/assethub",
  },
  {
    name: "Dwellir",
    url: "wss://asset-hub-paseo-rpc.n.dwellir.com",
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
  ss58Format: 0,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
  modules: {
    multisig: true,
  },
};

export default assethubPaseo;
