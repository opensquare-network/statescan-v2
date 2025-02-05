import { ReactComponent as Polimec } from "../../../components/icons/polimec.svg";
import { polkadotColor } from "./common";

const nodes = [
  {
    name: "Amforc",
    url: "wss://polimec.rpc.amforc.com/",
  },
  {
    name: "Helikon",
    url: "wss://rpc.helikon.io/polimec",
  },
  {
    name: "IBP1",
    url: "wss://polimec.ibp.network/",
  },
  {
    name: "IBP2",
    url: "wss://polimec.dotters.network/",
  },
  {
    name: "Polimec Foundation",
    url: "wss://rpc.polimec.org",
  },
];

const polimec = {
  name: "Polimec",
  icon: <Polimec />,
  identity: "polimec",
  chain: "polkadot",
  value: "polimec",
  symbol: "PLMC",
  decimals: 10,
  ...polkadotColor,
  modules: {
    multisig: true,
    assets: true,
  },
  nodes,
  useOnChainBlockData: true,
  para: {
    relay: "Polkadot",
    id: "3344",
  },
};

export default polimec;
