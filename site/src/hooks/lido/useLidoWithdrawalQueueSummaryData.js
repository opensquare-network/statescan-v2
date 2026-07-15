import isNil from "lodash.isnil";
import { useLidoStatusData } from "./useLidoStatusData";

const WITHDRAWAL_QUEUE_STATUS = {
  ACTIVE: "Active",
  PAUSED: "Paused",
};

const EMPTY_PENDING_REQUESTS_DATA = {
  pendingRequests: null,
  latestFinalization: null,
  latestRequest: null,
};

const EMPTY_STATUS_SUMMARY_DATA = {
  status: null,
  resumeSinceTimestamp: null,
};

function toStringOrNull(value) {
  if (isNil(value)) {
    return null;
  }
  return String(value);
}

function toPausedStatus(isPaused) {
  if (typeof isPaused !== "boolean") {
    return null;
  }

  return isPaused
    ? WITHDRAWAL_QUEUE_STATUS.PAUSED
    : WITHDRAWAL_QUEUE_STATUS.ACTIVE;
}

const FUNCTION_NAME_TO_STATUS_FIELD = {
  getLastCheckpointIndex: "latestCheckpointIndex",
  getLastFinalizedRequestId: "latestFinalization",
  getLastRequestId: "latestRequest",
  getLockedEtherAmount: "lockedEther",
  getResumeSinceTimestamp: "resumeSinceTimestamp",
  isPaused: "isPaused",
  unfinalizedRequestNumber: "pendingRequests",
  unfinalizedStETH: "unfinalizedStEth",
};

function useWithdrawalQueueSummaryStatus() {
  return useLidoStatusData("lido-withdrawal-queue-summary", {});
}

export function useWithdrawalQueueData({
  functionName,
  format = toStringOrNull,
}) {
  const queryResult = useWithdrawalQueueSummaryStatus();
  const fieldName = FUNCTION_NAME_TO_STATUS_FIELD[functionName];
  const value = fieldName ? queryResult.data?.[fieldName] : null;

  return {
    ...queryResult,
    data: format(value),
  };
}

export function useLidoWithdrawalQueuePendingRequestsData() {
  const queryResult = useWithdrawalQueueSummaryStatus();

  return {
    ...queryResult,
    data: queryResult.data
      ? {
          pendingRequests: toStringOrNull(queryResult.data.pendingRequests),
          latestFinalization: toStringOrNull(
            queryResult.data.latestFinalization,
          ),
          latestRequest: toStringOrNull(queryResult.data.latestRequest),
        }
      : EMPTY_PENDING_REQUESTS_DATA,
  };
}

export function useLidoWithdrawalQueueStatusData() {
  return useWithdrawalQueueData({
    functionName: "isPaused",
    format: toPausedStatus,
  });
}

export function useLidoWithdrawalQueueStatusSummaryData() {
  const queryResult = useWithdrawalQueueSummaryStatus();

  return {
    ...queryResult,
    data: queryResult.data
      ? {
          status: toPausedStatus(queryResult.data.isPaused),
          resumeSinceTimestamp: toStringOrNull(
            queryResult.data.resumeSinceTimestamp,
          ),
        }
      : EMPTY_STATUS_SUMMARY_DATA,
  };
}
