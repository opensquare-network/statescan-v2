# Vesting Scan

## Schema

```ts
interface Indexer {
  blockHeight: number;
  blockHash: string;
}

// Summaries
interface VestingSummary {
  numSchedules: number;
  numActiveSchedules: number;
  lockedAmount: bigint;
  indexer: Indexer;
}

interface AccountVestingSummary {
  account: string;
  numSchedules: number;
  numActiveSchduels: number;
  lockedAmount: bigint;
  indexer: Indexer;
}

// Vesting Records
interface VestingInfo {
  locked: number;
  perBlock: bigint;
  startingBlock: number;
}

interface VestingBlockRecord {
  account: string;
  block: number;
  schedules: VestingInfo[];
}

// Vesting Events
interface VestingCompleted {
  type: "VestingCompleted";
  account: string;
}

interface VestingUpdated {
  type: "VestingUpdated";
  account: string;
  unvested: bigint;
}

interface VestingEvent {
  indexer: Indexer;
  event: VestingCompleted | VestingUpdated;
}

// Vesting Calls
interface VestedTransfer {
  source: string;
  target: string;
  scheduel: VestingInfo;
  type: "vestedTransfer";
}

interface Vest {
  target: string;
  type: "vest";
}

interface MergeSchedules {
  scheduleIndex1: number;
  scheduleIndex2: number;
  type: "mergeSchedules";
}

interface VestingCall {
  indexer: Indexer;
  signedBy: string;
  call: VestedTransfer | Vest | MergeSchedules;
}
```
