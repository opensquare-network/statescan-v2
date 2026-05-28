import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_LOCATOR_ABI,
  LIDO_LOCATOR_ADDRESS,
  LIDO_WITHDRAWAL_QUEUE_ABI,
} from "../../services/evm/lido";
import isNil from "lodash.isnil";

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

async function getWithdrawalQueueAddress() {
  return evmPublicClient.readContract({
    address: LIDO_LOCATOR_ADDRESS,
    abi: LIDO_LOCATOR_ABI,
    functionName: "withdrawalQueue",
  });
}

function getContract(address, functionName) {
  return {
    address,
    abi: LIDO_WITHDRAWAL_QUEUE_ABI,
    functionName,
  };
}

function getFulfilledValue(result) {
  return result.status === "fulfilled" ? result.value : null;
}

export function useWithdrawalQueueData({
  functionName,
  format = toStringOrNull,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      return;
    }

    setLoading(true);

    try {
      const withdrawalQueueAddress = await getWithdrawalQueueAddress();
      const value = await evmPublicClient.readContract(
        getContract(withdrawalQueueAddress, functionName),
      );

      setData(format(value));
    } catch (e) {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [format, functionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}

export function useLidoWithdrawalQueuePendingRequestsData() {
  const [data, setData] = useState(EMPTY_PENDING_REQUESTS_DATA);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      return;
    }

    setLoading(true);

    try {
      const withdrawalQueueAddress = await getWithdrawalQueueAddress();
      const [pendingRequests, latestFinalization, latestRequest] =
        await Promise.all([
          evmPublicClient.readContract(
            getContract(withdrawalQueueAddress, "unfinalizedRequestNumber"),
          ),
          evmPublicClient.readContract(
            getContract(withdrawalQueueAddress, "getLastFinalizedRequestId"),
          ),
          evmPublicClient.readContract(
            getContract(withdrawalQueueAddress, "getLastRequestId"),
          ),
        ]);

      setData({
        pendingRequests: toStringOrNull(pendingRequests),
        latestFinalization: toStringOrNull(latestFinalization),
        latestRequest: toStringOrNull(latestRequest),
      });
    } catch (e) {
      setData(EMPTY_PENDING_REQUESTS_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}

export function useLidoWithdrawalQueueStatusData() {
  return useWithdrawalQueueData({
    functionName: "isPaused",
    format: toPausedStatus,
  });
}

export function useLidoWithdrawalQueueStatusSummaryData() {
  const [data, setData] = useState(EMPTY_STATUS_SUMMARY_DATA);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      return;
    }

    setLoading(true);

    try {
      const withdrawalQueueAddress = await getWithdrawalQueueAddress();
      const [isPaused, resumeSinceTimestamp] = await Promise.allSettled([
        evmPublicClient.readContract(
          getContract(withdrawalQueueAddress, "isPaused"),
        ),
        evmPublicClient.readContract(
          getContract(withdrawalQueueAddress, "getResumeSinceTimestamp"),
        ),
      ]);

      setData({
        status: toPausedStatus(getFulfilledValue(isPaused)),
        resumeSinceTimestamp: toStringOrNull(
          getFulfilledValue(resumeSinceTimestamp),
        ),
      });
    } catch (e) {
      setData(EMPTY_STATUS_SUMMARY_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}
