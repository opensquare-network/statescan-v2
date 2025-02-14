import { ReactComponent as Paseo } from "../../../components/icons/paseo.svg";
import { paseoColor } from "./common";

const paseo = {
  name: "Paseo",
  value: "paseo",
  chain: "paseo",
  icon: <Paseo />,
  symbol: "PAS",
  decimals: 10,
  identity: "paseo",
  ...paseoColor,
  modules: {
    multisig: true,
    proxy: true,
  },
  nodes: [
    { name: "Amforc", url: "wss://paseo.rpc.amforc.com/" },
    { name: "IBP1", url: "wss://rpc.ibp.network/paseo" },
    { name: "StakeWorld", url: "wss://pas-rpc.stakeworld.io" },
    { name: "Dwellir", url: "wss://paseo-rpc.dwellir.com" },
    { name: "IBP2", url: "wss://paseo.dotters.network" },
  ],
};

export default paseo;
