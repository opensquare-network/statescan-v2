# statescan-v2

Statescan is a modularized and business pluggable explorer for [substrate](https://github.com/paritytech/substrate)
based chains.

## Terminology

- Data indexing: we use js scripts to query blockchain history data, normalize and save them to database.
- Scan: it's a process that we index blockchain data in a height asc order.

## Code structure

This code base can be divided into 3 parts: data indexing, servers(restful and graphql) and fronted pages.

### Data indexing

Currently, we have the following packages for data indexing.

- [block-scan](./backend/packages/block-scan) for block/extrinsic/event/transfer data.
- [account-scan](./backend/packages/account-scan) for latest account balance info.
- [runtime-scan](./backend/packages/account-scan) for history runtime metadata versions.
- [identity-scan](./backend/packages/identity-scan) for identity related business.
- [assets-scan](./backend/packages/pallet-assets-scan)
  for [pallet assets](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/assets) business.
- [pallet-proxy-scan](./backend/packages/pallet-proxy-scan)
  for [proxy pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/proxy) business.
- [pallet-recovery-scan](./backend/packages/pallet-recovery-scan)
  for [recover pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/recovery) business.
- [vesting-scan](./backend/packages/vesting-scan) for latest vesting data.
- [multisig-scan](./backend/packages/multisig-scan) for multisig data indexing.
- [uniques-scan](./backend/packages/uniques-scan) for previous uniques pallet business indexing, outdated.

### Data servers

We have a [RESTful server](./backend/packages/server) and a [GraphQL server](./backend/packages/graphql-server), and the
RESTful server will be finally replaced by the GraphQL server.

### [Site](./site)

The site package call APIs from servers and render fronted pages.

## Setup

We should install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) first for data
storage.

Then generally we should first index necessary data, then setup restful and graphql servers, and finally the site.
Servers rely on the indexed data, and site reply on the APIs by the servers.

For more detail or questions, you can reach us in [matrix](https://app.element.io/#/room/#opensquare:matrix.org) or
create issues [here](https://github.com/opensquare-network/statescan-v2/issues).
