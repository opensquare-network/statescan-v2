import CrustIcon from "../../../components/icons/crustIcon";

const nodes = [
  {
    name: "OnFinality",
    url: "wss://crust.api.onfinality.io/ws?apikey=04dc9514-ec6c-4293-a739-aad78f8b26b5",
  },
  {
    name: "Crust",
    url: "wss://rpc.crustnetwork.xyz",
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
