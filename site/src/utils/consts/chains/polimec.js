import { ReactComponent as Polimec } from "../../../components/icons/polimec.svg";

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
  customTheme: {
    light: {
      theme500: "#1B202C",
      theme100: "rgba(27, 32, 44, 0.1)",
    },
    dark: {
      theme500: "#FFFFFF",
      theme100: "rgba(255, 255, 255, 0.1)",
      fontButtonTag: "#1B202C",
    },
  },
  modules: {
    multisig: true,
    foreignAssets: true,
  },
  nodes,
  useOnChainBlockData: true,
  para: {
    relay: "Polkadot",
    id: "3344",
  },
};

export default polimec;
