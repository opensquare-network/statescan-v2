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
  removed_block: number | null;
}

interface VestingTimeline {
  vestingIndexer: {
    blockHeight: number;
    initialIndex: number;
  };
  event: VestingEvent;
}

VestingEvent = VestingStartEvent | VestingEndEvent | VestingVestedEvent;

interface VestingCreatedEvent {
  type: "created";
  blockHeight: number;
  from: account;
  target: account;
  index: number;
  extrinsic: ExtrinsicIndexer;
}

interface VestingRemovedEvent {
  type: "removed";
  blockHeight: number;
  from: account;
  target: account;
  index: number;
  extrinsic: ExtrinsicIndexer;
}
```
