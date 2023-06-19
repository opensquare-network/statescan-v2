# Vesting Scan

```ts
interface Indexer {
  blockHeight: number;
  initialIndex: number;
  currentIndex: number;
}

interface Vesting {
  indexer: Indexer;
  from: account;
  target: account;
  starting_block: number;
  locked: bigint;
  per_block: bigint;
  ending_block: number | null;
}

interface VestingTimeline {
  vestingIndexer: {
    blockHeight: number;
    initialIndex: number;
  };
  event: VestingEvent;
}

VestingEvent = VestingStartEvent | VestingEndEvent | VestingVestedEvent;

interface VestingStartEvent {
  type: "start";
  blockHeight: number;
  from: account;
  target: account;
  action: "vestTransfer" | "forceVestTransfer" | "merged";
}

interface VestingVestedEvent {
  type: "vested";
  blockHeight: number;
  from: account;
  target: account;
  action: "vested";
}

interface VestingEndEvent {
  type: "end";
  blockHeight: number;
  from: account;
  target: account;
  action: "vestedCompleted" | "forceVestTransfer";
}
```
