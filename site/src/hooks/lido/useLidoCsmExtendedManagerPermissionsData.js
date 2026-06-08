import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import { LIDO_CSM_NODE_OPERATOR_MANAGEMENT_PROPERTIES_ABI } from "../../services/evm/lido";

export function useLidoCsmExtendedManagerPermissionsData(
  address,
  nodeOperatorId,
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!evmPublicClient || !address || !nodeOperatorId) {
      setData(null);
      return;
    }

    setLoading(true);

    evmPublicClient
      .readContract({
        address,
        abi: LIDO_CSM_NODE_OPERATOR_MANAGEMENT_PROPERTIES_ABI,
        functionName: "getNodeOperatorManagementProperties",
        args: [window.BigInt(nodeOperatorId)],
      })
      .then((result) => {
        setData(result?.[2] ?? null);
      })
      .catch(() => {
        setData(null);
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
