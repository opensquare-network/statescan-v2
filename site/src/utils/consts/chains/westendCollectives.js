import WestendCollectivesIcon from "../../../components/icons/westendCollectivesIcon";

const westendCollectives = {
  name: "Collectives",
  icon: <WestendCollectivesIcon />,
  identity: "westend",
  value: "westend-collectives",
  chain: "westend",
  symbol: "WND",
  decimals: 12,
  color: "#E6777A",
  colorSecondary: "rgba(230, 119, 122, 0.1)",
  buttonColor: "#E6777A",
  para: {
    relay: "Westend",
    id: "1001",
  },
  nodes: [
    { name: "IBP-GeoDNS1", url: "wss://sys.ibp.network/collectives-westend" },
    {
      name: "IBP-GeoDNS2",
      url: "wss://sys.dotters.network/collectives-westend",
    },
    { name: "Parity", url: "wss://westend-collectives-rpc.polkadot.io" },
  ],
};

export default westendCollectives;
