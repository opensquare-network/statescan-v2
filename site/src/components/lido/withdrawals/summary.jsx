import AssetSquareIcon from "../../icons/assetSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import {
  useLidoWithdrawalQueueStatusData,
  useWithdrawalQueueData,
} from "../../../hooks/lido/useLidoWithdrawalQueueSummaryData";
import LidoStatsCard, { StatsCardSection } from "../stats/card";
import LoadableContent from "../../loadings/loadableContent";
import { OnchainAmount } from "../home/metrics";
import { StatsGrid, StatsPanel } from "../home/styled";
import WithdrawalQueueStatus from "../withdrawalQueue/status";
import PendingRequestRange from "../withdrawalQueue/pendingRequestRange";

function WithdrawalQueueStatusValue() {
  const status = useLidoWithdrawalQueueStatusData();

  return (
    <LoadableContent loading={status.loading}>
      <WithdrawalQueueStatus status={status.data} />
    </LoadableContent>
  );
}

function UnfinalizedStETHValue() {
  const unfinalizedStETH = useWithdrawalQueueData({
    functionName: "unfinalizedStETH",
  });

  return (
    <OnchainAmount
      value={unfinalizedStETH.data}
      symbol="stETH"
      decimals={18}
      loading={unfinalizedStETH.loading}
    />
  );
}

function LockedEtherAmountValue() {
  const lockedEtherAmount = useWithdrawalQueueData({
    functionName: "getLockedEtherAmount",
  });

  return (
    <OnchainAmount
      value={lockedEtherAmount.data}
      symbol="ETH"
      decimals={18}
      loading={lockedEtherAmount.loading}
    />
  );
}

export default function LidoWithdrawalsSummary() {
  return (
    <StatsCardSection>
      <StatsPanel>
        <StatsGrid>
          <LidoStatsCard
            label="Pending Requests"
            value={<PendingRequestRange />}
            icon={<TransferSquareIcon />}
          />
          <LidoStatsCard
            label="Status"
            value={<WithdrawalQueueStatusValue />}
            icon={<TransferSquareIcon />}
          />
          <LidoStatsCard
            label="Unfinalized stETH"
            value={<UnfinalizedStETHValue />}
            icon={<AssetSquareIcon />}
          />
          <LidoStatsCard
            label="Locked Ether Amount"
            value={<LockedEtherAmountValue />}
            icon={<AssetSquareIcon />}
          />
        </StatsGrid>
      </StatsPanel>
    </StatsCardSection>
  );
}
