export default function getMetaData(breadCrumbs) {
  const json = [
    {
      name: "Multisigs",
      desc: "A transaction requiring multiple authorized signatories for execution.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-guides-accounts-multisig#multisig-transactions-with-extrinsic-tab",
    },
    {
      name: "Proxy",
      desc: "Enables users to delegate specific actions or permissions to other accounts, enhancing security and flexibility.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-proxies",
    },
    {
      name: "Recoveries",
      desc: "Accounts that have been successfully recovered.",
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
