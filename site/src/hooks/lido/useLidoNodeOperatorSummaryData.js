import { normalizeEvmAddress } from "../../utils/normalizeAddress";
import { useLidoStatusData } from "./useLidoStatusData";

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

function findNodeOperatorSummary(
  items = [],
  address,
  nodeOperatorId,
  stakingModuleId,
) {
  const normalizedAddress = normalizeEvmAddress(address)?.toLowerCase();
  const normalizedNodeOperatorId = Number(nodeOperatorId);
  const normalizedStakingModuleId = Number(stakingModuleId);

  return items.find((item) => {
    if (Number(item.nodeOperatorId) !== normalizedNodeOperatorId) {
      return false;
    }

    if (!Number.isNaN(normalizedStakingModuleId)) {
      return Number(item.stakingModuleId) === normalizedStakingModuleId;
    }

    return item.address === normalizedAddress;
  });
}

export function useLidoNodeOperatorSummaryData(
  address,
  nodeOperatorId,
  stakingModuleId,
) {
  const queryResult = useLidoStatusData("lido-node-operator-summaries", {
    items: [],
  });
  const item = findNodeOperatorSummary(
    queryResult.data?.items,
    address,
    nodeOperatorId,
    stakingModuleId,
  );

  return {
    ...queryResult,
    data: item || emptyData,
  };
}

export function useLidoCsmExtendedManagerPermissionsData(
  address,
  nodeOperatorId,
) {
  const normalizedAddress = normalizeEvmAddress(address)?.toLowerCase();
  const queryResult = useLidoStatusData("lido-node-operator-summaries", {
    items: [],
  });
  const item = queryResult.data?.items?.find(
    (item) =>
      item.address === normalizedAddress &&
      Number(item.nodeOperatorId) === Number(nodeOperatorId),
  );

  return {
    ...queryResult,
    data: item?.extendedManagerPermissions ?? null,
  };
}
