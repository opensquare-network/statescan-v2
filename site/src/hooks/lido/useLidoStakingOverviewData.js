import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_LOCATOR_ABI,
  LIDO_LOCATOR_ADDRESS,
  LIDO_STAKING_ROUTER_ABI,
} from "../../services/evm/lido";

const emptyData = {
  contractAddress: null,
  totalModules: null,
  activeValidators: null,
  totalFee: null,
  nodeOperatorFee: null,
  treasuryFee: null,
  precisionPoints: null,
};

async function getStakingRouterAddress() {
  return evmPublicClient.readContract({
    address: LIDO_LOCATOR_ADDRESS,
    abi: LIDO_LOCATOR_ABI,
    functionName: "stakingRouter",
  });
}

export function useLidoStakingOverviewData() {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      setData(emptyData);
      return;
    }

    setLoading(true);

    try {
      const stakingRouterAddress = await getStakingRouterAddress();
      const getStakingRouterContract = (functionName, args) => ({
        address: stakingRouterAddress,
        abi: LIDO_STAKING_ROUTER_ABI,
        functionName,
        args,
      });
      const [totalModules, moduleIds, feeAggregate, rewards] =
        await Promise.all([
          evmPublicClient.readContract(
            getStakingRouterContract("getStakingModulesCount"),
          ),
          evmPublicClient.readContract(
            getStakingRouterContract("getStakingModuleIds"),
          ),
          evmPublicClient.readContract(
            getStakingRouterContract("getStakingFeeAggregateDistribution"),
          ),
          evmPublicClient.readContract(
            getStakingRouterContract("getStakingRewardsDistribution"),
          ),
        ]);
      const moduleActiveValidators = await Promise.all(
        moduleIds.map((moduleId) =>
          evmPublicClient.readContract(
            getStakingRouterContract("getStakingModuleActiveValidatorsCount", [
              moduleId,
            ]),
          ),
        ),
      );
      const activeValidators = moduleActiveValidators.reduce(
        (result, count) => result + count,
        window.BigInt(0),
      );
      const [modulesFee, treasuryFee, basePrecision] = feeAggregate;
      const [, , , totalFee, precisionPoints] = rewards;

      setData({
        contractAddress: stakingRouterAddress,
        totalModules: totalModules?.toString() ?? null,
        activeValidators: activeValidators?.toString() ?? null,
        totalFee: totalFee?.toString() ?? null,
        nodeOperatorFee: modulesFee?.toString() ?? null,
        treasuryFee: treasuryFee?.toString() ?? null,
        precisionPoints: (precisionPoints || basePrecision)?.toString() ?? null,
      });
    } catch {
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
