# pallet-revive-scan

Scan the [revive pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/revive) business of a
chain, i.e. the contracts deployed through it and the calls made to them.

## Chains

The pallet runs on two chains, and everything which differs between them is kept in
`src/scripts/networks.js`:

| network    | `CHAIN`     | subscan host                               | blockscout host                         |
| ---------- | ----------- | ------------------------------------------ | --------------------------------------- |
| `polkadot` | `statemint` | `https://assethub-polkadot.api.subscan.io` | `https://blockscout.polkadot.io`        |
| `kusama`   | `statemine` | `https://assethub-kusama.api.subscan.io`   | `https://blockscout-kusama.polkadot.io` |

The scripts pick the network from their `--network=<name>` argument, or from the `CHAIN` of the `.env` when the argument
is missing, `polkadot` when neither is set. A chain outside of these two has no revive pallet this package knows how to
handle, so the scripts stop with an error instead of indexing it. A script which reads the chain state also checks the
spec name of the node in `WS_ENDPOINT`, which is the same `statemint` or `statemine` name, so a node of another chain is
rejected instead of having its contracts indexed into the wrong database.

## Collections

- `contract`: one document per contract deployed by the pallet, with its address, deployer, code hash, original code
  and the indexer of the creating transaction.
- `call`: one document per contract call, with the caller, the callee, the method selector parsed out of the call data,
  the indexer of the transaction and whether that transaction succeeded.
- `verifiedContract`: the verified contracts of a Blockscout instance, with their source code, additional sources and
  ABI. It is filled by `src/scripts/verifiedContracts/sync.js`, not by the block scan.
- `token`: one document per ERC-20 token of the chain, with its name, symbol, decimals and total supply, read from the
  contract state by `src/scripts/tokens/syncTokens.js`.

## Verified contracts

`src/scripts/verifiedContracts/sync.js` mirrors the verified contracts of a Blockscout instance into the
`verifiedContract` collection of the revive database. Every contract is upserted by its lower case address. Contracts
which disappeared from the Blockscout list are kept, so the collection can also be used as history. The instance follows
the network, and a chain outside of the two supported ones is rejected.

The script is meant to run from cron:

```sh
*/30 * * * * cd /path/to/pallet-revive-scan && mkdir -p log && node src/scripts/verifiedContracts/sync.js >> log/verified-contracts.log 2>&1
```

It exits with `0` when the run succeeded, `1` when at least one contract could not be fetched, and skips with `0` when
another sync still holds the `syncLock` document. The lock is refreshed while the sync runs, so a crashed run does not
block the next one for longer than `VERIFIED_CONTRACT_SYNC_LOCK_TTL_MS`.

The first run fetches every contract detail. A rerun skips the details whose `verified_at` and compiler version did not
change, and only refreshes `lastSeenAt`.

| Variable                             | Meaning                                                 |
| ------------------------------------ | ------------------------------------------------------- |
| `BLOCKSCOUT_API_HOST`                | Blockscout instance, defaults to the one of the network |
| `BLOCKSCOUT_REQUEST_TIMEOUT_MS`      | request timeout, default 30000                          |
| `BLOCKSCOUT_REQUEST_RETRIES`         | retries of a rate limited or failed request, default 4  |
| `BLOCKSCOUT_DETAIL_CONCURRENCY`      | contract details fetched in parallel, default 4         |
| `BLOCKSCOUT_MAX_PAGES`               | list pages to walk, `0` walks all, default 0            |
| `VERIFIED_CONTRACT_UPSERT_BATCH`     | upserts per bulk write, default 50                      |
| `VERIFIED_CONTRACT_SYNC_LOCK_TTL_MS` | lock ttl, refreshed while running, default 30 minutes   |

## Contract creation

A creation transaction does not carry the address of the contract it deploys, so the deployment is indexed from the
`revive.Instantiated { deployer, contract }` event, which the chain emits right after the constructor ran. The code of
the contract is then read from the chain state at that block:

- `revive.accountInfoOf(contract)` gives the code hash of the account,
- `revive.pristineCode(codeHash)` gives the original code kept for that hash, which several contracts created from the
  same code share.

Everything the pallet offers to deploy a contract is covered the same way: `instantiate`, `instantiateWithCode`,
`ethInstantiateWithCode` and the `ethTransact` carrying a transaction without a recipient.

### Contracts deployed by another contract

A contract which is deployed from inside another one, e.g. by a factory calling `CREATE`, emits no `Instantiated`
event: the pallet emits it for a top level instantiation only. Such a contract leaves no trace in the block other than
the logs it emits while its constructor runs, so the scan treats every address that emitted a `revive.ContractEmitted`
event as a deployment candidate and asks the chain state instead of the events:

- `revive.accountInfoOf(address)` at the scanned block tells whether the address is really a contract account, which
  filters the precompiles out, and gives the code hash;
- the same lookup at the parent block tells whether the contract already existed. When it did, the contract was missed
  by an earlier run and the creation block is located by a binary search: the account info of an address is written
  when its contract is created, so the first block holding it is the creation block. The search needs an archive node,
  when the state of a past block is not served the contract is indexed at the block it was first seen in, without a
  deployer.

The deployer of an observed deployment is the sender of the carrying transaction, which is the account that paid for
the deployment rather than the factory contract, the same way explorers report it.

The limitation is a contract which emits no log while being constructed: it is only indexed once it emits an event or is
called, and the creation block is found from the state at that point.

### Sweeping the whole state

`revive.accountInfoOf` is a plain storage map, so every account the pallet knows can be enumerated, by
`state_getKeysPaged` or `entriesAt`, at most 1000 keys per page. The block scan leaves it alone, the cost of reading it
grows with the number of accounts, but `src/scripts/contracts/syncContracts.js` reads the whole map at the head block
and indexes the contracts the database does not know yet, locating their creation block with the same state search:

```sh
# repair every contract missing from the database
node src/scripts/contracts/syncContracts.js

# only the first 10, handy to try it out
node src/scripts/contracts/syncContracts.js 10
```

It catches the contracts which emit no log while being constructed. The first run walks the history of every contract
it adds, the later ones only handle what appeared since, so give it the archive endpoint in `WS_ENDPOINT`: the creation
block of a contract which was missed is located by reading the state of past blocks, and the run stops at the start when
the endpoint does not serve them. A contract whose creation block cannot be confirmed is skipped instead of being
indexed at a block it was not created in.

The scan process runs the same sweep by itself, from `src/jobs`, at 03:30 on the odd days of the month, i.e. every
other day. One run at a time, and a failing run is logged and retried at the next tick instead of stopping the scan. The
cron expression comes from `CONTRACT_SYNC_CRON`, set it to a pattern to run at another time, e.g. `0 0 5 * * *` for a
daily run, or to `0` to keep the job out of the scan process and run the script from cron instead.

The map is small on AssetHub Polkadot, a few hundred entries which fit in a single page, but it holds the externally
owned accounts too, so it is only a snapshot: the entry of an address is written when its contract is created, which is
what the creation block search relies on.

| Variable             | Meaning                                                  |
| -------------------- | -------------------------------------------------------- |
| `SYNC_CONCURRENCY`   | contracts handled in parallel, default 4                 |
| `WS_ENDPOINT`        | must be an archive endpoint, see `CHAIN` as well         |
| `CONTRACT_SYNC_CRON` | schedule of the job in the scan process, `0` disables it |

## Tokens

The scan detects a token as soon as it indexes the contract which deploys it, so the `token` collection follows the
blocks. The contracts it indexed before this hook existed, and the precompiles of the `pallet-assets`, are left to
`src/scripts/tokens/syncTokens.js`, which sweeps them and can refresh the metadata of the whole list.

Only the EIP-20 metadata getters are read, `name()`, `symbol()`, `decimals()` and `totalSupply()`: a contract which
answers all four with a value that decodes is a token, and the four values are stored with it.

The getters go through the `reviveApi.call` runtime api, which the node executes as a dry run: no transaction, no fee
and no state change, only the weight of the node is spent. Two details of that api decide the detection:

- a reverted call is reported as a successful result carrying the revert flag, so the flag is checked before the answer
  is read;
- a contract with a fallback answers every selector with success and no data at all, so the bytes are decoded strictly
  (`uint256`, `uint8`, `string`, or the single word an old contract returns), and a value which does not decode means
  the contract is not a token.

The assets of the `pallet-assets` are exposed to the revive pallet as ERC-20 precompiles, one per asset, at an
address derived from the asset id (`assetId << 128 | 0x0120 << 16`). A precompile is no deployed contract: it has no
code and no account info, so it never reaches the `contract` collection the list is built from. The script enumerates
the assets of the chain and reads their metadata through the same getters, so they reach the list as well. Their
documents carry `precompile: true` and the `assetId`, and no deployer, code hash or creation indexer.

```sh
# the contracts which are not tokens yet, and the assets of the chain
node src/scripts/tokens/syncTokens.js --network=kusama

# read every contract again, which refreshes the metadata of the known tokens
node src/scripts/tokens/syncTokens.js --network=kusama --all
```

| Flag                | Meaning                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| `--network=<name>`  | `polkadot` or `kusama`, defaults to the network of `CHAIN`                     |
| `--all`             | reads every contract and asset, otherwise the ones known as tokens are skipped |
| `--limit=<n>`       | handles only the first n items of each queue                                   |
| `--concurrency=<n>` | items read in parallel, defaults to `SYNC_CONCURRENCY` or 4                    |

The `token` collection holds one document per token: the address, `name`, `symbol`, `decimals`, `totalSupply` as the
string of the uint256, `standard`, whether the contract is verified, the `deployer` and `codeHash` of the contract, the
creation `indexer` and `readAt`, the block the metadata was read at.

## Caller

The caller of a call is the origin of the extrinsic carrying it:

- a substrate account address (e.g. `126Xh...`), for `revive.call` and `revive.ethCall`, including the ones nested in
  `utility.batchAll`, `proxy.proxy` and so on;
- the ethereum address recovered from the transaction signature, for `revive.ethTransact`, which is an unsigned
  extrinsic carrying an encoded ethereum transaction.

Only the four leading bytes of the call data are read as the method selector, they are stored as is in `methodHash`, so
the site can resolve them against the known ABIs.

`isSuccess` tells whether the whole extrinsic succeeded, which is the only execution status the chain records for a
call in a batch.

## Environment

```sh
WS_ENDPOINT=wss://polkadot-asset-hub-rpc.polkadot.io
CHAIN=statemint

MONGO_PALLET_REVIVE_SCAN_URL=mongodb://127.0.0.1:27017
MONGO_PALLET_REVIVE_SCAN_NAME=prod-statescan-statemint-revive-1

MONGO_DB_KNOWN_HEIGHTS_URL=mongodb://127.0.0.1:27017
MONGO_DB_KNOWN_HEIGHTS_NAME=known-heights-statescan-statemint-revive
```

## Rebuilding history

The scripts in `src/scripts/rebuild` rebuild the contract and call history of a chain. They only index the blocks which
really hold revive business, instead of scanning the chain from the genesis block:

```sh
# 1. Merge the heights of the deployment and call blocks into the block list
node src/scripts/rebuild/fetchCallBlocks.js [blocks file] [--network=<name>]

# 2. Scan those blocks
node src/scripts/rebuild/index.js [blocks file] [--network=<name>]
```

The block lists are: `call-blocks-polkadot.json` for AssetHub Polkadot, which `--network=polkadot` picks and is the
default, and `call-blocks-kusama.json` for AssetHub Kusama, which `--network=kusama` picks. Both live in
`src/scripts/rebuild`. Every chain has its own revive history, so the two lists are collected and scanned separately.

A Kusama rebuild needs the Kusama `WS_ENDPOINT`, `CHAIN` and database names in the `.env`. `index.js` refuses a list
which does not belong to the chain it is configured for, so the two cannot be mixed up by accident.

The list is always scanned in ascending block order, so a completed run ends at its newest block and a normal revive-scan
continues from the height right after it.

`fetchCallBlocks.js` reads the `revive.Instantiated` events from the
[subscan open api](https://support.subscan.io) and merges the block heights into the block list, which is kept sorted
ascending, i.e. by time. It reads the list first, so running it again only adds what is missing.

The deployments have to come from the event search: a contract deployed before the newest revive calls is only visible
being called in the call list, so a block list built from calls alone never makes the scan handle an `Instantiated`
event.

The blocks of the `revive.eth_transact` extrinsics are always merged too, read with the `call` filter of the extrinsic
search, so a list collected without the full walk still covers the blocks of the ethereum transactions.

The blocks of the remaining revive calls are collected as well when `WITH_CALL_BLOCKS=1` is set. That walks every revive
extrinsic of the chain, one request per page, which takes a long while.

| Variable                | Meaning                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `SUBSCAN_API_KEY`       | required, a key is available at https://support.subscan.io |
| `SUBSCAN_API_HOST`      | overrides the api host of the network                      |
| `SUBSCAN_API_ROW`       | items per request, 25 is the biggest the api accepts       |
| `SUBSCAN_API_MAX_PAGES` | walks only the newest pages, handy to try it out           |
| `WITH_CALL_BLOCKS`      | set to `1` to walk every revive extrinsic as well          |

Every page is logged, and the list is saved after the deployments are merged and again after the calls are, so a run
which is stopped during the call walk still keeps what it collected so far.

`index.js` sorts the list ascending and goes through it from the oldest block. Every block is reported with the number
of contracts and calls it produced:

```
14830703 finished, 3/10338, contracts 1, calls 0
```

The run is resumable: the height of the last handled block is kept in the `status` collection of the revive database, so
running the same command again goes on after it instead of starting over. The blocks which are already scanned are
reported at the start of the run.

The blocks are fetched several at a time, the next ones wait in a queue while the current block is written. Only the
fetching is concurrent, a block is always indexed before the next one, so the heights reach the database in the order of
the list.

| Flag                | Meaning                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `--network=<name>`  | `polkadot` or `kusama`, defaults to the network of `CHAIN`                    |
| `--fresh`           | drops the stored progress and scans the list from its start again             |
| `--after=<height>`  | starts after the given height, for the runs made before the progress was kept |
| `--concurrency=<n>` | blocks fetched ahead, defaults to `SCAN_CONCURRENCY` or 8                     |

A public rpc endpoint rate limits a run with a big concurrency, lower it when blocks start to fail to be fetched.

When the list is complete, a rerun reports that nothing is left and stops.
