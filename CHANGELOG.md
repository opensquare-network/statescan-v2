# Changelog

All notable changes to this project will be documented in this file.

### 1.4.5

date: 2024-06-06

- Support people kusama para chain.

### 1.4.4

date: 2024-06-01

- [Big]Support substrate recovery pallet business, including data scan, graphql server and fronted pages.

### 1.4.3

date: 2024-05-27

- Add block/time filter for extrinsics/events/transfers.
- Improve multisig table hover info, so we can see approving signatories.
- Improve styles.

### 1.4.2

date: 2024-05-17

- Use graphql API for assets fronted.
- Add destroyedAt field to asset graphql API query.
- remove tangle testnet from chains menu.

### 1.4.1

date: 2024-05-14

- Add vesting page to show on-chain vestings.
- Take place of identity/multisig graphql server with the common graphql server.
- Fix paged asset timeline data type in graphql server.

### 1.4.0

date: 2024-05-11

- [Big] Extract assets pallet scan and create new graphql server.
- Refactor vesting scan.
- Add a common graphql server and serve many packages data.
- update dependencies.

### 1.3.2

date: 2024-05-06

- Index part of unsigned extrinsic for gargantua.
- Support crust, invarch, tinkernet.
- Upgrade dependencies.

### 1.3.1

date: 2024-04-28

- Update dependencies.
- Add script to update all identities.
- Change gargantua nodes config.

### 1.3.0

- Support new chains: parallel, heiko, tangle mainnet and testnet.
- Fix assets pallet account data query.
- Support known heights scan for assets pallet.
- Add resources for asset DED.
- Fix block/extrinsic hash for gargantua.
- Fix bug introduced by new identity pallet code.
- Support identity search on home page.
- Update dependencies.
- Improve unfinalized blocks handling.
- Introduce cron for scan jobs.

### 1.2.6

date: 2024-03-31

- Support polkadot crust parachain.

### 1.2.5

date: 2024-03-20

- Support crust shadow.
- Support gargantua.

## 1.2.4

date: 2024-02-25

- Fix extrinsics query in simple scan mode.
- Remove polimec from chain menu.

## 1.2.3

date: 2024-01-17

- Support hydradx testnet and polimec.
- Fix account field normalization in scan.

## 1.2.2

date: 2023-12-30

- Improve chain RPC connections. Best node is selected, and fault tolerance is Enhanced.
- Correct icon for multisig unsign.

## 1.2.1

date: 2023-12-05

- Enable multisig for litentry and litmus.

## 1.2.0

date: 2023-12-04

- [Big]Support multisig.
- Correct dotreasury api and site url.
- Update dependencies.

## 1.1.4

date: 2023-11-06

- Support simple mode in which we don't save block data and unnecessary extrinsic and event data to database.
- Remove extrinsic result and para chain inclusion event from event list page.

## 1.1.3

date: 2023-10-27

- Fix dropdown components filter on extrinsic/events list page.
- Fix NFT small logo style.
- Save multisig signatories info when scan multisigs.
- Fix statemine endpoint.
- Fix styles.

## 1.1.2

date: 2023-09-21

- [Big] Add `multisig-scan` package to support multisig pallet business scan.
- Support query extrinsic/event data from RPC node.
- Add USDC asset info on statemint.
- Fix the issue that home page subscribed info is updated too frequently.

## 1.1.1

date: 2023-09-12

- Support on-chain data querying for account details.
- Turn on on-chain data query for more chains.
- Show 404 for invalid block and account.

## 1.1.0

date: 2023-09-11

- [Big] Support identity business.
- Introduce RPC nodes and support querying block data from selected node.
- Add vesting-scan package.
- Upgrade dependencies and fix styles.

## 1.0.1

date: 02/14/2023

- Support westend and polkadot collectives para-chain.
- Style fix: home page singed transfers list layout.
