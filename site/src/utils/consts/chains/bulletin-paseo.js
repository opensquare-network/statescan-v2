import { ReactComponent as Bulletin } from "../../../components/icons/bulletin.svg";

const nodes = [
  {
    name: "StakingLand",
    url: "wss://bulletin-paseo.tservices.es:8443",
  },
];

const bulletinPaseo = {
  name: "Bulletin Paseo",
  icon: <Bulletin width={20} height={20} />,
  identity: "paseo",
  value: "bulletin-paseo",
  chain: "paseo",
  symbol: "PAS",
  decimals: 10,
  nodes,
  color: "#6B2D84",
  colorSecondary: "rgba(107, 45, 132, 0.1)",
  useOnChainBlockData: true,
};

export default bulletinPaseo;
