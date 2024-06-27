import CrustIcon from "../../../components/icons/crustIcon";

const nodes = [
  {
    name: "Crust",
    url: "wss://crust-parachain.crustnetwork.xyz",
  },
];

const polkadotCrust = {
  name: "Crust",
  icon: <CrustIcon />,
  identity: "crust",
  chain: "polkadot",
  value: "crust-parachain",
  symbol: "CRU",
  decimals: 12,
  color: "#FA8C16",
  colorSecondary: "rgba(250,140,22, 0.1)",
  modules: {
    identity: true,
    multisig: false,
  },
  nodes,
  useOnChainBlockData: true,
};

export default polkadotCrust;
