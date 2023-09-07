import PolkadotCollectivesIcon from "../../../components/icons/polkadotCollectivesIcon";

const collectives = {
  name: "Collectives",
  icon: <PolkadotCollectivesIcon />,
  identity: "polkadot",
  value: "collectives",
  chain: "polkadot",
  symbol: "DOT",
  decimals: 10,
  color: "#E6777A",
  colorSecondary: "rgba(230, 119, 122, 0.1)",
  buttonColor: "#E6777A",
  para: {
    relay: "Polkadot",
    id: "1001",
  },
  nodes: [
    { name: "Parity", url: "wss://polkadot-collectives-rpc.polkadot.io" },
    { name: "IBP-GeoDNS1", url: "wss://sys.ibp.network/collectives-polkadot" },
    {
      name: "IBP-GeoDNS2",
      url: "wss://sys.dotters.network/collectives-polkadot",
    },
    {
      name: "LuckyFriday",
      url: "wss://rpc-collectives-polkadot.luckyfriday.io",
    },
    {
      name: "OnFinality",
      url: "wss://collectives.api.onfinality.io/public-ws",
    },
    {
      name: "RadiumBlock",
      url: "wss://collectives.public.curie.radiumblock.co/ws",
    },
    { name: "Stakeworld", url: "wss://dot-rpc.stakeworld.io/collectives" },
  ],
};

export default collectives;
