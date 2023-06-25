# Vesting Scan

```ts
interface Indexer {
  initialBlockHeight: number;
  initialIndex: number;
  currentIndex: number;
}

interface Vesting {
  indexer: Indexer;
  from: account;
  target: account;
  startingBlock: number;
  locked: bigint;
  perBlock: bigint;
  removedBlock: number | null;
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
  extrinsic: ExtrinsicIndexer;
}

interface VestingRemovedEvent {
  type: "removed";
  blockHeight: number;
  from: account;
  target: account;
  extrinsic: ExtrinsicIndexer;
}

interface Account {
  account: account;
  locked: bigint;
}

interface AcccountTimelineIndexer {
  blockHeight: number;
  extrinsicIndex: number;
  eventIndex: number;
}

interface AccountTimeline {
  indexer: AccountTimelineIndexer;
  account: account;
  locked: bigint;
}
```
