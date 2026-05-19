import BreadCrumb from "../../components/breadCrumb";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import LidoStakingRouterETHDepositedsTable from "../../components/lido/stakingRouterETHDepositeds/table";
import { useLidoModuleEventFilter } from "../../hooks/filter/useLidoModuleEventFilter";
import { useLidoStakingRouterETHDepositedsData } from "../../hooks/lido/useLidoStakingRouterETHDepositedsData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

export default function LidoStakingRouterETHDepositeds() {
  const filter = useLidoModuleEventFilter();
  const chainSettings = useChainSettings();
  const { data, loading } = useLidoStakingRouterETHDepositedsData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Module Deposits" }]} />

      <Filter data={filter} />

      <LidoStakingRouterETHDepositedsTable
        data={data}
        loading={loading}
        chainSettings={chainSettings}
      />
    </Layout>
  );
}
