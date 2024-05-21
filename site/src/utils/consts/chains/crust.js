import CrustIcon from "../../../components/icons/crustIcon";

const nodes = [
  {
    name: "Crust",
    url: "wss://rpc2-subscan.crust.network",
  },
];

const crust = {
  name: "Crust",
  icon: <CrustIcon />,
  identity: "crust",
  value: "crust",
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

export default crust;
