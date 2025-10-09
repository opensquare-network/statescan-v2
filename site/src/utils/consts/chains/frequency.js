import { ReactComponent as FrequencyIcon } from "../../../components/icons/frequency.svg";

const nodes = [
  {
    name: "Frequency 0",
    url: "wss://0.rpc.frequency.xyz",
  },
  {
    name: "Frequency 1",
    url: "wss://1.rpc.frequency.xyz",
  },
  {
    name: "OnFinality",
    url: "wss://frequency-polkadot.api.onfinality.io",
  },
];

const frequency = {
  name: "Frequency",
  icon: <FrequencyIcon />,
  chain: "polkadot",
  value: "frequency",
  symbol: "BFRQCY",
  decimals: 8,
  ss58Format: 90,
  color: "#790e70",
  colorSecondary: "rgba(121, 14, 112, 0.1)",
  nodes,
  useOnChainBlockData: true,
};

export default frequency;
