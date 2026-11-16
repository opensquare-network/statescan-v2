import styled from "styled-components";
import LoadableContent from "../../loadings/loadableContent";
import Tooltip from "../../tooltip";
import { ColoredInterLink } from "../../styled/link";
import { currencify } from "../../../utils";
import { Inter_14_600 } from "../../../styles/text";
import { useLidoWithdrawalQueuePendingRequestsData } from "../../../hooks/lido/useLidoWithdrawalQueueSummaryData";
import BigNumber from "bignumber.js";

const RequestRange = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

const RangeSeparator = styled.span`
  ${Inter_14_600};
  color: ${(p) => p.theme.fontTertiary};
`;

function toCount(value) {
  return currencify(Number(value || 0));
}

function toNextRequestId(requestId) {
  if (!requestId) {
    return null;
  }

  return new BigNumber(requestId).plus(1).toFixed();
}

function RequestLink({ requestId }) {
  if (!requestId) {
    return "--";
  }

  return (
    <ColoredInterLink to={`/steth/withdrawals/${requestId}`}>
      {requestId}
    </ColoredInterLink>
  );
}

export default function PendingRequestRange() {
  const { data, loading } = useLidoWithdrawalQueuePendingRequestsData();
  const { latestFinalization, latestRequest, pendingRequests } = data;
  const fromRequestId = toNextRequestId(latestFinalization);

  if (loading) {
    return <LoadableContent loading />;
  }

  if (!fromRequestId || !latestRequest) {
    return "--";
  }

  return (
    <Tooltip tip={`Total pending ${toCount(pendingRequests)}`}>
      <RequestRange>
        <RequestLink requestId={fromRequestId} />
        <RangeSeparator>to</RangeSeparator>
        <RequestLink requestId={latestRequest} />
      </RequestRange>
    </Tooltip>
  );
}
