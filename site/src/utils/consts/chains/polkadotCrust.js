import CrustIcon from "../../../components/icons/crustIcon";

const nodes = [
  {
    name: "Crust",
    url: "wss://crust-parachain.crustapps.net/",
  },
];

const polkadotCrust = {
  name: "Crust",
  icon: <CrustIcon />,
  identity: "crust",
  chain: "polkadot",
  value: "polkadot-crust-parachain",
  symbol: "CRU",
  decimals: 12,
  color: "#FA8C16",
  colorSecondary: "rgba(250,140,22, 0.1)",
  modules: {
    identity: true,
    multisig: false,
  },
  nodes,
  useOnChainBlockData: false,
};

export default polkadotCrust;
