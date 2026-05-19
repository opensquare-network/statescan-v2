import PolkadotCollectivesIcon from "../../../components/icons/polkadotCollectivesIcon";

export const collectivesModules = {
  identity: false,
  multisig: false,
};

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
  modules: collectivesModules,
  para: {
    relay: "Polkadot",
    id: "1001",
  },
  nodes: [
    {
      name: "Parity",
      url: "wss://polkadot-collectives-rpc.polkadot.io",
    },
    {
      name: "IBP1",
      url: "wss://collectives-polkadot.ibp.network",
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
      name: "Dwellir",
      url: "wss://collectives-polkadot-rpc.n.dwellir.com",
    },
    {
      name: "IBP2",
      url: "wss://collectives-polkadot.dotters.network",
    },
    {
      name: "RadiumBlock",
      url: "wss://collectives.public.curie.radiumblock.co/ws",
    },
    {
      name: "Stakeworld",
      url: "wss://dot-rpc.stakeworld.io/collectives",
    },
  ],
  useOnChainBlockData: true,
};

export default collectives;
