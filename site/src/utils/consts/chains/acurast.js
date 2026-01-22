import { ReactComponent as AcurastIcon } from "../../../components/icons/acurast.svg";

const nodes = [
  {
    name: "Acurast",
    url: "wss://public-archive.mainnet.acurast.com",
  },
];

const acurast = {
  name: "Acurast",
  icon: <AcurastIcon />,
  chain: "polkadot",
  value: "acurast",
  symbol: "ACU",
  decimals: 12,
  ss58Format: 42,
  color: "rgba(145,190,2,1)",
  colorSecondary: "rgba(145,190,2,0.1)",
  nodes,
  useOnChainBlockData: true,
};

export default acurast;
