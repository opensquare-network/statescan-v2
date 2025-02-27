import { ReactComponent as Argon } from "../../../components/icons/argon.svg";

const nodes = [
  {
    name: "Argon",
    url: "wss://rpc.argon.network",
  },
];

const argon = {
  name: "Argon",
  icon: <Argon />,
  value: "argon",
  symbol: "ARGN",
  decimals: 6,
  nodes,
  color: "#AF00C1",
  colorSecondary: "rgba(175, 0, 193, 0.1)",
  useOnChainBlockData: true,
};

export default argon;
