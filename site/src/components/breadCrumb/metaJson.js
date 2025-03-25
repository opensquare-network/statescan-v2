export default function getMetaData(breadCrumbs) {
  const json = [
    {
      name: "Extrinsics",
      desc: "A SCALE encoded array consisting of a version number, signature, and varying data types, extrinsics constitute information from the outside world.",
      wikiLink:
        "https://wiki.polkadot.network/docs/build-protocol-info#extrinsics",
    },
    {
      name: "Events",
      desc: "Events represent information from the chain, extrinsics can trigger events.",
      wikiLink: "https://wiki.polkadot.network/docs/build-protocol-info#events",
    },
    {
      name: "Calls",
      desc: "The executable functions within a runtime module (also known as a pallet) and define the various operations that can be performed in the blockchain’s runtime.",
      wikiLink: "https://docs.substrate.io/reference/frame-pallets/",
    },
    {
      name: "Transfers",
      desc: "The act of moving assets from one account (address) to another.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn/xcm/journey/transfers",
    },
    {
      name: "Accounts",
      desc: "The fundamental entities in blockchain network used for interacting with the blockchain.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-accounts",
    },
    {
      name: "Assets",
      desc: "Fungible assets. One unit is equivalent to any other unit to claim the underlying item.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-assets#fungible-assets",
    },
    {
      name: "NFT",
      desc: "Non-fungible assets. A type of digital asset that represents ownership or proof of authenticity of unique items.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-assets#non-fungible-assets",
    },
    {
      name: "Destroyed Assets",
      desc: "The fungible assets that have been destroyed.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-assets#destroying-an-asset",
    },
    {
      name: "Destroyed NFT",
      desc: "The non-fungible assets that have been destroyed.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-assets#non-fungible-assets",
    },
    {
      name: "Identities",
      desc: "A naming system enabling users to incorporate personal details into their blockchain accounts and seek validation of these details from registrars.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-identity",
    },
    {
      name: "Identity Judgements",
      desc: "A process where a registrar evaluates and verifies the identity information submitted by an account.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-identity#judgements",
    },
    {
      name: "Identity Registrars",
      desc: "An entity or individual authorized to verify and validate the identity of accounts. Registrars can set a fee for their services and limit their attestation to certain fields.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-identity#registrars",
    },
    {
      name: "Multisig Accounts",
      desc: "An account that requires multiple parties to approve a transaction before it can be executed, it is composed of one or more addresses and a threshold.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-account-multisig",
    },
    {
      name: "Multisigs",
      desc: "A transaction that requires multiple authorized signatories to approve it before it can be executed.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-guides-accounts-multisig#multisig-transactions-with-extrinsic-tab",
    },
    {
      name: "Recovery Proxies",
      desc: "A M-of-N recovery tool based on the multi-signature wallet designed to help users recover access to their accounts in case they lose their private keys.",
      wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    },
    {
      name: "Recoverables",
      desc: "Accounts that have been pre-configured with a recovery mechanism, allowing the account owner to regain access if they lose their private key.",
      wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    },
    {
      name: "Recoveries",
      desc: "Accounts that have been recoveried.",
      wikiLink: "https://wiki.polkadot.network/docs/kusama-social-recovery",
    },
    {
      name: "Vestings",
      desc: "Vested transaction allows users to transfer tokens that are subject to a vesting schedule.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-guides-transfers#vested-transfers-with-the-polkadot-js-ui",
    },
    {
      name: "Proxy",
      desc: "Proxy account allows users to delegate specific actions or permissions to other accounts, increasing the security and flexibility of account management.",
      wikiLink: "https://wiki.polkadot.network/docs/learn-proxies",
    },
    {
      name: "Foreign Assets",
      desc: "Fungible assets. These are mainly native tokens from other parachains or bridged tokens from other consensus systems.",
      wikiLink:
        "https://wiki.polkadot.network/docs/build-integrate-assets#foreign-assets",
    },
    {
      name: "Destroyed Foreign Assets",
      desc: "The fungible assets that have been destroyed.",
      wikiLink:
        "https://wiki.polkadot.network/docs/learn-assets#destroying-an-asset",
    },
  ];

  const matched = breadCrumbs?.[0];

  if (matched && breadCrumbs.length <= 1) {
    return json.find((item) => item.name === matched.name);
  }

  return null;
}
