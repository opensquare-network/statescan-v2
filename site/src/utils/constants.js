export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const chains = [
  {
    name: "Statemine",
    sub: "Kusama",
    value: "statemine",
    symbol: "KSM",
    chainIcon: "kusama",
    color: "#3765DC",
    colorSecondary: "#EAF0FF",
    buttonColor: "#000000",
    logo: "logo-img-2",
  },
  {
    name: "Statemint",
    sub: "Polkadot",
    value: "statemint",
    symbol: "DOT",
    chainIcon: "polkadot",
    color: "#E6007A",
    colorSecondary: "#FDE5F2",
    buttonColor: "#E6007A",
    hidden: false,
  },
  {
    name: "Westmint",
    sub: "Westend",
    value: "westmint",
    symbol: "WND",
    chainIcon: "westend",
    color: "#DA68A7",
    colorSecondary: "#FAE6F2",
    buttonColor: "#DA68A7",
  },
];

export const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
  },
];

export const blocksHead = [
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Status", width: 160 },
  { name: "Hash", width: 280 },
  { name: "Validator", width: 152 },
  { name: "Extrinsics", align: "right" },
  { name: "Events", align: "right" },
];
