import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_LOCATOR_ABI,
  LIDO_LOCATOR_ADDRESS,
  LIDO_WITHDRAWAL_QUEUE_ABI,
} from "../../services/evm/lido";
import isNil from "lodash.isnil";

const emptyData = {
  latestFinalization: null,
  status: null,
  resumeSinceTimestamp: null,
  lockedEtherAmount: null,
};

const WITHDRAWAL_QUEUE_STATUS = {
  ACTIVE: "Active",
  PAUSED: "Paused",
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

function getContracts(address) {
  return [
    {
      field: "latestFinalization",
      abi: LIDO_WITHDRAWAL_QUEUE_ABI,
      address,
      functionName: "getLastFinalizedRequestId",
      format: toStringOrNull,
    },
    {
      field: "status",
      abi: LIDO_WITHDRAWAL_QUEUE_ABI,
      address,
      functionName: "isPaused",
      format: toPausedStatus,
    },
    {
      field: "resumeSinceTimestamp",
      abi: LIDO_WITHDRAWAL_QUEUE_ABI,
      address,
      functionName: "getResumeSinceTimestamp",
      format: toStringOrNull,
    },
    {
      field: "lockedEtherAmount",
      abi: LIDO_WITHDRAWAL_QUEUE_ABI,
      address,
      functionName: "getLockedEtherAmount",
      format: toStringOrNull,
    },
  ];
}

function toSummaryData(results, contracts) {
  return contracts.reduce((data, contract, index) => {
    const result = results[index];
    const value = result.status === "fulfilled" ? result.value : null;

    return {
      ...data,
      [contract.field]: contract.format(value),
    };
  }, emptyData);
}

export function useLidoWithdrawalQueueSummaryData() {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      return;
    }

    setLoading(true);

    try {
      const withdrawalQueueAddress = await evmPublicClient.readContract({
        address: LIDO_LOCATOR_ADDRESS,
        abi: LIDO_LOCATOR_ABI,
        functionName: "withdrawalQueue",
      });

      const contracts = getContracts(withdrawalQueueAddress);
      const results = await Promise.allSettled(
        contracts.map((contract) => evmPublicClient.readContract(contract)),
      );

      setData(toSummaryData(results, contracts));
    } catch (e) {
      setData(emptyData);
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
