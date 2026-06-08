import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import { LIDO_NODE_OPERATORS_REGISTRY_ABI } from "../../services/evm/lido";

const emptyData = {
  targetLimitMode: null,
  targetValidatorsCount: null,
  stuckValidatorsCount: null,
  refundedValidatorsCount: null,
  stuckPenaltyEndTimestamp: null,
  totalExitedValidators: null,
  totalDepositedValidators: null,
  depositableValidatorsCount: null,
};

function toSummaryData(result) {
  if (!result) {
    return emptyData;
  }

  return {
    targetLimitMode: result[0]?.toString(),
    targetValidatorsCount: result[1]?.toString(),
    stuckValidatorsCount: result[2]?.toString(),
    refundedValidatorsCount: result[3]?.toString(),
    stuckPenaltyEndTimestamp: result[4]?.toString(),
    totalExitedValidators: result[5]?.toString(),
    totalDepositedValidators: result[6]?.toString(),
    depositableValidatorsCount: result[7]?.toString(),
  };
}

export function useLidoNodeOperatorSummaryData(address, nodeOperatorId) {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!evmPublicClient || !address || !nodeOperatorId) {
      setData(emptyData);
      return;
    }

    setLoading(true);

    evmPublicClient
      .readContract({
        address,
        abi: LIDO_NODE_OPERATORS_REGISTRY_ABI,
        functionName: "getNodeOperatorSummary",
        args: [window.BigInt(nodeOperatorId)],
      })
      .then((result) => {
        setData(toSummaryData(result));
      })
      .catch(() => {
        setData(emptyData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address, nodeOperatorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}
