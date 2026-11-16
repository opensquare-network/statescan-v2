export default function getMetaData(breadCrumbs) {
  const json = [
    {
      name: "stETH",
      desc: "Lido is an ERC-20 rebasing token, which represents staked ether, stETH. Tokens are minted upon ether submission and burned when redeemed. stETH holder balances are updated daily with oracle reports. It also implements the ERC-2612 permit and ERC-1271 signature validation extensions.",
      wikiLink: "https://docs.lido.fi/contracts/lido/",
    },
    {
      name: "wstETH",
      desc: "It's an ERC-20 value-accruing token wrapper for stETH. Its balance does not change with each oracle report, but its value in stETH does. Internally, it represents the user's share of the total supply of stETH tokens.",
      wikiLink: "https://docs.lido.fi/contracts/wsteth/",
    },
    {
      name: "Staking Modules",
      desc: "Modules are registered with StakingRouter through the Lido DAO voting process. To be considered by the governance, the applying module contract should implement the appropriate module interface, meet security requirements, and have a fee structure aligned with the Lido protocol sustainability. Once voted in, the module starts receiving stake and protocol fees.",
      wikiLink:
        "https://docs.lido.fi/contracts/staking-router/#module-management",
    },
    {
      name: "Module Deposits",
      desc: "Module Deposits record the submission of buffered ETH along with validator keys by a staking module to Ethereum’s DepositContract, creating new validators in batches of 32 ETH each.",
      wikiLink: "https://docs.lido.fi/contracts/staking-router/#deposit",
    },
    {
      name: "Multisigs",
      desc: "All history multisig records and their status and we can filter them by address or status.",
      wikiLink: "https://wiki.polkadot.network/learn/learn-account-multisig/",
    },
    {
      name: "Proxy",
      desc: "Enables users to delegate specific actions or permissions to other accounts, enhancing security and flexibility.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-proxies",
    },
    {
      name: "Recoveries",
      desc: "All social recovery records and their statuses.",
      wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    },
    // {
    //   name: "Extrinsics",
    //   desc: "A SCALE-encoded array containing a version number, signature, and various data types, representing external information.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/build-protocol-info#extrinsics",
    // },
    // {
    //   name: "Events",
    //   desc: "Represent on-chain information, extrinsics can trigger events.",
    //   wikiLink: "https://wiki.polkadot.network/docs/build-protocol-info#events",
    // },
    // {
    //   name: "Calls",
    //   desc: "Executable functions within a runtime module that define blockchain operations.",
    //   wikiLink: "https://docs.substrate.io/reference/frame-pallets/",
    // },
    // {
    //   name: "Transfers",
    //   desc: "The act of moving assets from one account to another.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn/xcm/journey/transfers",
    // },
    // {
    //   name: "Accounts",
    //   desc: "Fundamental entities in a blockchain network used for interaction.",
    //   wikiLink: "https://wiki.polkadot.network/docs/learn-accounts",
    // },
    // {
    //   name: "Assets",
    //   desc: "Fungible assets. One unit is equivalent to any other unit to claim the underlying item.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-assets#fungible-assets",
    // },
    // {
    //   name: "NFT",
    //   desc: "Non-fungible assets. A type of digital asset that represents ownership or proof of authenticity of unique items.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-assets#non-fungible-assets",
    // },
    // {
    //   name: "Destroyed Assets",
    //   desc: "The fungible assets that have been destroyed.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-assets#destroying-an-asset",
    // },
    // {
    //   name: "Destroyed NFT",
    //   desc: "The non-fungible assets that have been destroyed.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-assets#non-fungible-assets",
    // },
    // {
    //   name: "Identities",
    //   desc: "A naming system allowing users to integrate personal details into their blockchain accounts and seek validation from registrars.",
    //   wikiLink: "https://wiki.polkadot.network/docs/learn-identity",
    // },
    // {
    //   name: "Identity Judgements",
    //   desc: "The process where a registrar evaluates and verifies an account’s identity information.",
    //   wikiLink: "https://wiki.polkadot.network/docs/learn-identity#judgements",
    // },
    // {
    //   name: "Identity Registrars",
    //   desc: "An entity authorized to verify account identities, set fees, and limit attestations to specific fields.",
    //   wikiLink: "https://wiki.polkadot.network/docs/learn-identity#registrars",
    // },
    // {
    //   name: "Multisig Accounts",
    //   desc: "An account requiring multiple parties' approval for transactions, composed of multiple addresses and a threshold.",
    //   wikiLink: "https://wiki.polkadot.network/docs/learn-account-multisig",
    // },
    // {
    //   name: "Recovery Proxies",
    //   desc: "An M-of-N recovery tool based on multi-signature wallets to help users regain account access if they lose their private keys.",
    //   wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    // },
    // {
    //   name: "Recoverables",
    //   desc: "Accounts pre-configured with a recovery mechanism, allowing owners to regain access if they lose their private key.",
    //   wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    // },
    // {
    //   name: "Vestings",
    //   desc: "Allows the transfer of tokens subject to a vesting schedule.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-guides-transfers#vested-transfers-with-the-polkadot-js-ui",
    // },
    // {
    //   name: "Foreign Assets",
    //   desc: "Fungible assets. These are mainly native tokens from other parachains or bridged tokens from other consensus systems.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/build-integrate-assets#foreign-assets",
    // },
    // {
    //   name: "Destroyed Foreign Assets",
    //   desc: "The fungible assets that have been destroyed.",
    //   wikiLink:
    //     "https://wiki.polkadot.network/docs/learn-assets#destroying-an-asset",
    // },
  ];

  const matched = breadCrumbs?.[0];

  if (matched && breadCrumbs.length <= 1) {
    return json.find((item) => item.name === matched.name);
  }

  return null;
}
