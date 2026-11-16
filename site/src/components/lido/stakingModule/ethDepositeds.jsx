import LidoStakingRouterETHDepositedsTable from "../stakingRouterETHDepositeds/table";
import { useLidoStakingRouterETHDepositedsData } from "../../../hooks/lido/useLidoStakingRouterETHDepositedsData";

export default function LidoStakingModuleETHDepositeds({ stakingModuleId }) {
  const { data, loading } =
    useLidoStakingRouterETHDepositedsData(stakingModuleId);

  return (
    <LidoStakingRouterETHDepositedsTable
      data={data}
      loading={loading}
      showModuleId={false}
    />
  );
}
