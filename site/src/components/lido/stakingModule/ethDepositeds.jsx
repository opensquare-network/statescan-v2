import LidoStakingRouterETHDepositedsTable from "../stakingRouterETHDepositeds/table";
import { useLidoStakingRouterETHDepositedsData } from "../../../hooks/lido/useLidoStakingRouterETHDepositedsData";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

export default function LidoStakingModuleETHDepositeds({ stakingModuleId }) {
  const chainSettings = useChainSettings();
  const { data, loading } =
    useLidoStakingRouterETHDepositedsData(stakingModuleId);

  return (
    <LidoStakingRouterETHDepositedsTable
      data={data}
      loading={loading}
      chainSettings={chainSettings}
      showModuleId={false}
    />
  );
}
