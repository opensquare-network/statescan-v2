import { ReactComponent as Kintsugi } from "../../../components/icons/kintsugi.svg";

const nodes = [
  {
    name: "OnFinality",
    url: "wss://kintsugi.api.onfinality.io/public-ws",
  },
  {
    name: "Kintsugi Labs",
    url: "wss://api-kusama.interlay.io/parachain",
  },
];

const interlay = {
  name: "Kintsugi",
  icon: <Kintsugi />,
  identity: "kintsugi",
  value: "kintsugi",
  chain: "kusama",
  symbol: "KINT",
  decimals: 12,
  nodes,
  color: "#DC7D27",
  colorSecondary: "rgba(220, 125, 39, 0.1)",
  useOnChainBlockData: true,
};

export default interlay;
