import List from "../../list";
import LoadableContent from "../../loadings/loadableContent";
import LidoValue from "../value";
import { Panel } from "../../styled/panel";
import { TextSecondary } from "../../styled/text";
import HelpLabel from "../../tooltip/helpLabel";
import isNil from "lodash.isnil";
import { InlineValueSlot } from "../../styled/valueSlot";
import {
  useLidoWithdrawalQueueStatusSummaryData,
  useWithdrawalQueueData,
} from "../../../hooks/lido/useLidoWithdrawalQueueSummaryData";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import WithdrawalQueueStatus from "./status";
import PendingRequestRange from "./pendingRequestRange";

function LockedEtherAmount({ value }) {
  const chainSettings = useChainSettings();
  if (isNil(value)) {
    return "--";
  }

  const { decimals, symbol } = chainSettings;

  return <LidoValue value={value} decimals={decimals} symbol={symbol} />;
}

function UnfinalizedStETH({ value }) {
  if (isNil(value)) {
    return "--";
  }

  return <LidoValue value={value} decimals={18} symbol="stETH" />;
}

function toBatch(value) {
  if (isNil(value)) {
    return "--";
  }

  return `#${value}`;
}

function WithdrawalQueueStatusValue() {
  const status = useLidoWithdrawalQueueStatusSummaryData();

  return (
    <LoadableContent loading={status.loading}>
      <WithdrawalQueueStatus
        status={status.data.status}
        resumeSinceTimestamp={status.data.resumeSinceTimestamp}
        showResumeTime
      />
    </LoadableContent>
  );
}

function UnfinalizedStETHValue() {
  const unfinalizedStETH = useWithdrawalQueueData({
    functionName: "unfinalizedStETH",
  });

  return (
    <LoadableContent loading={unfinalizedStETH.loading}>
      <UnfinalizedStETH value={unfinalizedStETH.data} />
    </LoadableContent>
  );
}

function LockedEtherAmountValue() {
  const lockedEtherAmount = useWithdrawalQueueData({
    functionName: "getLockedEtherAmount",
  });

  return (
    <LoadableContent loading={lockedEtherAmount.loading}>
      <LockedEtherAmount value={lockedEtherAmount.data} />
    </LoadableContent>
  );
}

function LatestCheckpointValue() {
  const latestCheckpoint = useWithdrawalQueueData({
    functionName: "getLastCheckpointIndex",
  });

  return (
    <LoadableContent loading={latestCheckpoint.loading}>
      <TextSecondary>{toBatch(latestCheckpoint.data)}</TextSecondary>
    </LoadableContent>
  );
}

export default function LidoWithdrawalQueueSummary() {
  const data = [
    {
      label: "Status",
      value: (
        <InlineValueSlot>
          <WithdrawalQueueStatusValue />
        </InlineValueSlot>
      ),
    },
    {
      label: "Pending Requests",
      value: (
        <InlineValueSlot>
          <PendingRequestRange />
        </InlineValueSlot>
      ),
    },
    {
      label: (
        <HelpLabel tip="Amount of stETH in the queue yet to be finalized.">
          Unfinalized stETH
        </HelpLabel>
      ),
      value: (
        <InlineValueSlot>
          <UnfinalizedStETHValue />
        </InlineValueSlot>
      ),
    },
    {
      label: (
        <HelpLabel tip="Amount of ETH locked for withdrawal and available to claim.">
          Locked Ether Amount
        </HelpLabel>
      ),
      value: (
        <InlineValueSlot>
          <LockedEtherAmountValue />
        </InlineValueSlot>
      ),
    },
    {
      label: (
        <HelpLabel tip="Latest withdrawal checkpoint index.">
          Latest Checkpoint
        </HelpLabel>
      ),
      value: (
        <InlineValueSlot>
          <LatestCheckpointValue />
        </InlineValueSlot>
      ),
    },
  ];

  return (
    <Panel>
      <List data={data} />
    </Panel>
  );
}
