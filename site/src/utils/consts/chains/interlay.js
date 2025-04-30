import { ReactComponent as Interlay } from "../../../components/icons/interlay.svg";

const nodes = [
  {
    name: "LuckyFriday",
    url: "wss://rpc-interlay.luckyfriday.io",
  },
  {
    name: "Kintsugi Labs",
    url: "wss://api.interlay.io/parachain",
  },
];

const interlay = {
  name: "Interlay",
  icon: <Interlay />,
  identity: "interlay",
  value: "interlay",
  chain: "polkadot",
  symbol: "INTR",
  decimals: 10,
  nodes,
  color: "#085BBD",
  colorSecondary: "rgba(8, 91, 189, 0.1)",
  useOnChainBlockData: true,
};

export default interlay;
