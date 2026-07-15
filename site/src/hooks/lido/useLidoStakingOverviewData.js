import { useLidoStatusData } from "./useLidoStatusData";

const emptyData = {
  contractAddress: null,
  totalModules: null,
  activeValidators: null,
  totalFee: null,
  nodeOperatorFee: null,
  treasuryFee: null,
  precisionPoints: null,
  routerVersion: null,
};

export function useLidoStakingOverviewData() {
  return useLidoStatusData("lido-staking-overview", emptyData);
}
