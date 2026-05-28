import AssetSquareIcon from "../../icons/assetSquareIcon";
import FinalizedBlockSquareIcon from "../../icons/finalizedBlockSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { StatusNegativeTag, StatusPositiveTag } from "../../tag";
import { DetailedTime } from "../../styled/time";
import { FlexColumn } from "../../styled/flex";
import moment from "moment";
import BigNumber from "bignumber.js";
import { useLidoWithdrawalQueueSummaryData } from "../../../hooks/lido/useLidoWithdrawalQueueSummaryData";
import LidoStatsCard, {
  StatsCardSection,
  StatsMetricLink,
} from "../stats/card";
import { OnchainAmount } from "../home/metrics";
import { StatsGrid, StatsPanel } from "../home/styled";

function isFutureResumeTimestamp(timestamp) {
  if (!timestamp || timestamp === "0") {
    return false;
  }

  const timestampNumber = new BigNumber(timestamp);
  if (timestampNumber.gt(Number.MAX_SAFE_INTEGER)) {
    return false;
  }

  return moment.unix(timestampNumber.toNumber()).isAfter(moment());
}

function WithdrawalQueueStatus({ status, resumeSinceTimestamp }) {
  if (!status) {
    return "--";
  }

  if (status === "Active") {
    return <StatusPositiveTag>{status}</StatusPositiveTag>;
  } else if (status === "Paused") {
    if (!isFutureResumeTimestamp(resumeSinceTimestamp)) {
      return <StatusNegativeTag>{status}</StatusNegativeTag>;
    }

    return (
      <FlexColumn gap={8}>
        <StatusNegativeTag>{status}</StatusNegativeTag>
        <DetailedTime ts={Number(resumeSinceTimestamp) * 1000} />
      </FlexColumn>
    );
  }

  return status;
}

function FinalizedRequestLink({ requestId }) {
  if (!requestId) {
    return "--";
  }

  return (
    <StatsMetricLink to={`/steth/withdrawals/${requestId}`}>
      {requestId}
    </StatsMetricLink>
  );
}

export default function LidoWithdrawalsSummary() {
  const { data, loading } = useLidoWithdrawalQueueSummaryData();

  return (
    <StatsCardSection>
      <StatsPanel>
        <StatsGrid>
          <LidoStatsCard
            label="Latest Finalized Request"
            value={<FinalizedRequestLink requestId={data.latestFinalization} />}
            icon={<FinalizedBlockSquareIcon />}
            loading={loading}
          />
          <LidoStatsCard
            label="Status"
            value={
              <WithdrawalQueueStatus
                status={data.status}
                resumeSinceTimestamp={data.resumeSinceTimestamp}
              />
            }
            icon={<TransferSquareIcon />}
            loading={loading}
          />
          <LidoStatsCard
            label="Locked Ether Amount"
            value={
              <OnchainAmount
                value={data.lockedEtherAmount}
                symbol="ETH"
                decimals={18}
                loading={loading}
              />
            }
            icon={<AssetSquareIcon />}
            valueLoading={false}
          />
        </StatsGrid>
      </StatsPanel>
    </StatsCardSection>
  );
}
