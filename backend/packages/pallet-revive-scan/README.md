# pallet-revive-scan

Scan the [revive pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/revive) business of a
chain, i.e. the contracts deployed through it and the calls made to them.

## Collections

- `contract`: one document per contract deployed by the pallet, with its address, deployer, code hash, original code
  and the indexer of the creating transaction.
- `call`: one document per contract call, with the caller, the callee, the method selector parsed out of the call data,
  the indexer of the transaction and whether that transaction succeeded.

## Contract creation

A creation transaction does not carry the address of the contract it deploys, so the deployment is indexed from the
`revive.Instantiated { deployer, contract }` event, which the chain emits right after the constructor ran. The code of
the contract is then read from the chain state at that block:

- `revive.accountInfoOf(contract)` gives the code hash of the account,
- `revive.pristineCode(codeHash)` gives the original code kept for that hash, which several contracts created from the
  same code share.

Everything the pallet offers to deploy a contract is covered the same way: `instantiate`, `instantiateWithCode`,
`ethInstantiateWithCode` and the `ethTransact` carrying a transaction without a recipient.

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

## Scripts

To only index the blocks which really hold revive business, instead of scanning the chain from the genesis block:

```sh
# 1. Merge the heights of the deployment blocks into the block list
node src/scripts/fetchCallBlocks.js [blocks file]

# 2. Scan those blocks
node src/play.js [blocks file] [--reverse]
```

`fetchCallBlocks.js` reads the `revive.Instantiated` events from the
[subscan open api](https://support.subscan.io) and merges the block heights into the block list, which is kept sorted
ascending, i.e. by time. It reads the list first, so running it again only adds what is missing.

The deployments have to come from the event search: a contract deployed before the newest revive calls is only visible
being called in the call list, so a block list built from calls alone never makes the scan handle an `Instantiated`
event.

The call blocks are collected too when `WITH_CALL_BLOCKS=1` is set. That walks every revive extrinsic of the chain, one
request per page, which takes a long while.

| Variable                | Meaning                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `SUBSCAN_API_KEY`       | required, a key is available at https://support.subscan.io |
| `SUBSCAN_API_HOST`      | overrides the api host                                     |
| `SUBSCAN_API_ROW`       | items per request, 25 is the biggest the api accepts       |
| `SUBSCAN_API_MAX_PAGES` | walks only the newest pages, handy to try it out           |
| `WITH_CALL_BLOCKS`      | set to `1` to collect the call blocks as well              |

Every page is logged, and the list is saved after the deployments are merged, so a run which is stopped during the
optional call walk still keeps the deployments.

`play.js` goes through the list in the order it was saved, i.e. from the oldest block. Every block is reported with the
number of contracts and calls it produced:

```
14830703 finished, 3/10338, contracts 1, calls 0
```

The run is resumable: the height of the last handled block is kept in the `status` collection of the revive database, so
running the same command again goes on after it instead of starting over. The blocks which are already scanned are
reported at the start of the run.

The blocks are fetched several at a time, the next ones wait in a queue while the current block is written. Only the
fetching is concurrent, a block is always indexed before the next one, so the heights reach the database in the order of
the list.

| Flag                | Meaning                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `--reverse`         | walks the list from the newest block, the progress of the two directions is kept separately |
| `--fresh`           | drops the stored progress and scans the list from its start again                           |
| `--after=<height>`  | starts after the given height, for the runs made before the progress was kept               |
| `--concurrency=<n>` | blocks fetched ahead, defaults to `SCAN_CONCURRENCY` or 8                                   |

A public rpc endpoint rate limits a run with a big concurrency, lower it when blocks start to fail to be fetched.

When the list is complete, a rerun reports that nothing is left and stops.
