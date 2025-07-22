# Changelog

All notable changes to this project will be documented in this file.

### 1.7.2

date: 2025-07-22

- Turn on foreign assets module for assethub kusama.
- Update endpoints for heima, and coretime westend.
- Add the latest judgment column to identity registrars and fix sort.
- Add tooltip for `TimeAge` component.
- Fix dark mode style issue for location param on foreign asset detail page.
- Set foreign asset icons for assethub kusama.
- Add block navigation components on block detail page enabling users to go to the next or previous block.
- Support ss58 format change for hyperbridge including nexus and gargantua.
- Add the unlockable column to the vesting table.

### 1.7.1

date: 2025-07-18

- Support lazy-query for extrinsic and event params, so we don't have to index and save args for all extrinsics and
  events.
- Fix filter issues on extrinsics and events page.
- Turn on multisigs for assethub polkadot, assethub paseo and assethub westend.
- Disable calls for bridgehub chains, paseo and westend.
- Remove IBP RPCs from westend chains.
- a11y: set button role for the theme toggle component and menus.
- Support multisigs query by a signatory address.
- Check address when render extrinsic and event args.
- Upgrade dependencies.

### 1.7.0

date: 2025-06-23

- [Big] Support foreign assets for asset hub including data indexing, backend API and fronted pages.
- Fix `page` url query param not work.
- Add a brief introduction card for all businesses.
- Fix proxy query when call proxy_announced
- Support multisig for assethub kusama.
- Support ajuna, interlay, and remove invarch, tangle.
- Support unsigned extrinsic indexing for argon and cere.
- Handle multisig with asMultiThreshold1. It's a bug fix.
- Fix styles and upgrade dependencies.

### 1.6.3

date: 2025-03-19

- Update litentry to heima.
- Remove free field on account panel.
- Improve account all script log.
- Improve the layout of chain options dropdown menu.
- Remove uniques section from assethub chains.
- Update statemint settings.
- Set `typesBundle` for gargantua and nexus.
- Support un-finalized blocks for gargantua.
- Upgrade dependency.
- Show error method for a failed extrinsic.
- Support more chains:
  - people polkadot.
  - coretime polkadot.
  - coretime kusama.
  - coretime paseo.
  - people paseo.
  - bridgehub paseo.
  - assethub paseo.
  - westend and system parachains.
  - argon.
  - cere.

### 1.6.2

date: 2025-02-10

- Support paseo/polimec/stagelight.
- Disable uniques(NFT) section for assethub.
- Correct assethub chain name and domain.
- Ignore only HeartbeatReceived event for imOnline.
- Use block scan transfers data for tangle.
- Support different highlight color for light/dark mode.
- Fix: transfer table value column width.
- Rebrand Litentry to Heima.
- Style fixes and refactor.

### 1.6.1

date: 2024-12-02

- EVM support:
  - Save EVM tx info in block scan package.
  - Add EVM tx fronted detail page.
- Save balances transfer in block scan package.
- Support laos network.
- Add cron job at backend to update latest blocks and transfers.
- Remove achainable labels.
- Fix proxy scan script by guarding PureCreatedEvent block query.

### 1.6.0

date: 2024-11-07

- Support identity on people chain.
- Use onchain data when accessing extrinsic detail page with a hash.
- Fix section filter by the letter case problem.
- Add latest blocks/transfers/overview API.
- Support nexus network.
- Upgrade dependencies.

### 1.5.0

date: 2024-09-05

- [Big] Support proxy business including scan, graphql server and fronted pages.
- [Big] Support onchain info query from graphql server.
- Upgrade dependencies, fix styles and code refactor.

### 1.4.7

date: 2024-06-25

- Support special account identity display.
- Adjust endpoints for polkadot collectives.

### 1.4.6

date: 2024-06-12

- Support bridgehub of polkadot and kusama.
- Upgrade dependencies.
- Adjust polkadot/kusama nodes sort.
- Fix table scroll.

### 1.4.5

date: 2024-06-06

- Support people kusama para chain.
- Fix identity registrar statistics.

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
