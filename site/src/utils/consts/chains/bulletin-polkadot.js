import { ReactComponent as Bulletin } from "../../../components/icons/bulletin.svg";

const nodes = [
  {
    name: "Parity",
    url: "wss://bulletin-rpc.polkadot.io",
  },
  {
    name: "Spectrum",
    url: "wss://spectrum-03.simplystaking.xyz/cG9sa2Fkb3QtMDMtOTFkMmYwZGYtcG9sa2Fkb3Q/9QbAeudedsupNA/polkadotbulletin/mainnet/",
  },
];

const bulletinPolkadot = {
  name: "Bulletin",
  icon: <Bulletin width={20} height={20} />,
  identity: "polkadot",
  value: "bulletin-polkadot",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  nodes,
  color: "#6B2D84",
  colorSecondary: "rgba(107, 45, 132, 0.1)",
  useOnChainBlockData: true,
};

export default bulletinPolkadot;
