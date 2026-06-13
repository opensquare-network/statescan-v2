import { ReactComponent as Paseo } from "../../../components/icons/paseo.svg";
import { paseoColor } from "./common";

const paseo = {
  name: "Paseo",
  value: "paseo",
  chain: "paseo",
  icon: <Paseo />,
  symbol: "PAS",
  decimals: 10,
  ss58Format: 0,
  identity: "paseo",
  ...paseoColor,
  modules: {
    multisig: true,
    proxy: true,
  },
  nodes: [
    { name: "Zondax", url: "wss://api2.zondax.ch/pas/relay/node/rpc" },
    { name: "Amforc", url: "wss://paseo.rpc.amforc.com" },
    { name: "Dwellir", url: "wss://paseo-rpc.n.dwellir.com" },
  ],
  useOnChainBlockData: true,
  disabledMenus: ["calls"],
};

export default paseo;
