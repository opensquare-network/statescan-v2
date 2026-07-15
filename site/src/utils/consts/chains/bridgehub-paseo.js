import { ReactComponent as BridgehubPaseo } from "../../../components/icons/bridegehub-paseo.svg";
import { paseoColor } from "./common";

const nodes = [
  {
    name: "Zondax",
    url: "wss://api2.zondax.ch/pas/bridgehub/node/rpc",
  },
];

const bridgehubPaseo = {
  name: "Bridgehub",
  icon: <BridgehubPaseo />,
  identity: "paseo",
  value: "bridgehub-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  ...paseoColor,
  nodes,
  useOnChainBlockData: true,
  disabledMenus: ["calls"],
};

export default bridgehubPaseo;
