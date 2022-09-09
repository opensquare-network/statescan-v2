import charwnna from "./statemine/asset-567";

// asset id => asset info
const statemineInfo = new Map([
  [
    8, //asset id
    {
      icon: "/imgs/icons/asset/rmrk.svg",
      about:
        "RMRK.app is a part of Kusama's broader NFT strategy and a way to abuse Kusama's system.remark extrinsic to write custom notes onto the chain in a standardized and structured way. $RMRK is the governance, staking, and collateral token.",
      links: [
        {
          name: "Website",
          url: "https://rmrk.app",
          icon: "/imgs/icons/link-default.svg",
        },
        {
          name: "Twitter: @rmrkapp",
          url: "https://twitter.com/RmrkApp",
          icon: "/imgs/icons/link-twitter.svg",
        },
        {
          name: "Twitter: @rmrkstatus",
          url: "https://twitter.com/rmrkstatus",
          icon: "/imgs/icons/link-twitter.svg",
        },
        {
          name: "Telegram: Kanaria project",
          url: "https://t.me/kanaria_official",
          icon: "/imgs/icons/link-telegram.svg",
        },
        {
          name: "Telegram: RMRK in general",
          url: "https://t.me/rmrkapp",
          icon: "/imgs/icons/link-telegram.svg",
        },
        {
          name: "Subsocial",
          url: "https://app.subsocial.network/@rmrkapp",
          icon: "/imgs/icons/link-subsocial.svg",
        },
        {
          name: "Youtube",
          url: "https://www.youtube.com/channel/UCZ9dCwNm2aErxsYxDdm-AtQ",
          icon: "/imgs/icons/link-youtube.svg",
        },
        {
          name: "Discord",
          url: "https://discord.com/invite/SpNEQSSwWv",
          icon: "/imgs/icons/link-discord.svg",
        },
      ],
    },
  ],
  [
    1984,
    {
      icon: "/imgs/icons/asset/usdt.svg",
      about:
        "Tether gives you the joint benefits of open blockchain technology and traditional currency by converting your cash into a stable digital currency equivalent.",
    },
  ],
  [
    16,
    {
      icon: "/imgs/icons/asset/polarisdao.svg",
      about:
        "PolarisDAO is a community-managed DAO with members from Web3 developers, artists, and venture capitalists. We are committed to advancing the NFTs market in the Dotsama ecosystem and identifying early investment opportunities. ARIS is PolarisDAO’s native token. It will be used for protocol governance and voting on expenditures of the PolarisDAO Vault (treasury).",
      links: [
        {
          name: "Twitter",
          url: "https://twitter.com/polaris_dao",
          icon: "/imgs/icons/link-twitter.svg",
        },
        {
          name: "Medium",
          url: "https://medium.com/@polarisdao",
          icon: "/imgs/icons/link-medium.svg",
        },
        {
          name: "Gitbook",
          url: "https://polaris-dao.gitbook.io/polarisdao/",
          icon: "/imgs/icons/link-gitbook.svg",
        },
        {
          name: "Discord",
          url: "https://discord.gg/bayqHZ9akq",
          icon: "/imgs/icons/link-discord.svg",
        },
        {
          name: "CommonWealth",
          url: "https://commonwealth.im/polaris-dao/",
          icon: "/imgs/icons/link-commonwealth.svg",
        },
        {
          name: "Voting",
          url: "https://voting.opensquare.io/space/polarisdao",
          icon: "/imgs/icons/link-osn.svg",
        },
        {
          name: "Linktree",
          url: "https://linktr.ee/PolarisDAO",
          icon: "/imgs/icons/link-linktree.svg",
        },
      ],
    },
  ],
  [
    20,
    {
      icon: "/imgs/icons/asset/bfkk.png",
      about:
        "A group of hobbyists who live in Berlin and we like the feelings of the nature.",
      links: [
        {
          name: "Twitter: @sheenhuxin",
          url: "https://twitter.com/sheenhuxin",
          icon: "/imgs/icons/link-twitter.svg",
        },
      ],
    },
  ],
  [
    43,
    {
      icon: "/imgs/icons/asset/danger.png",
      about:
        "DANGER tokens are rewarded to accounts that own NFTs in The Most Dangerous NFT Game collection on RMRK. These tokens will determine the odds of each token holder in the lottery that will take place in 2022.",
      links: [
        {
          name: "Website",
          url: "https://dangerlottery.com/",
          icon: "/imgs/icons/link-default.svg",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/Dangerous_NFT",
          icon: "/imgs/icons/link-twitter.svg",
        },
        {
          name: "Singular",
          url: "https://singular.rmrk.app/collections/9ea8ca9480f9f6df43-DANGER",
          icon: "/imgs/icons/link-default.svg",
        },
      ],
    },
  ],
  [
    223,
    {
      icon: "/imgs/icons/asset/bill.svg",
      about: "For educational purposes only.",
      links: [],
    },
  ],
  charwnna,
]);

// node => assets info
const assetInfo = new Map([["statemine", statemineInfo]]);

export const getAssetInfo = (node, assetId) => {
  return assetInfo?.get(node)?.get(Number(assetId));
};
