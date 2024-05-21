import { ReactComponent as InvArch } from "../../../components/icons/invarch.svg";

const nodes = [
  {
    name: "Dwellir",
    url: "wss://invarch-rpc.dwellir.com/",
  },
];

const invarch = {
  name: "InvArch",
  icon: <InvArch />,
  identity: "invarch",
  value: "invarch",
  chain: "polkadot",
  symbol: "VARCH",
  decimals: 12,
  color: "#EF8846",
  colorSecondary: "rgba(239, 135, 70, 0.1)",
  nodes,
  useOnChainBlockData: true,
  modules: {
    identity: true,
  },
};

export default invarch;
