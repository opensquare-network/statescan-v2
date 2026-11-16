import BreadCrumb from "../../components/breadCrumb";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import LidoStakingVaultsTable from "../../components/lido/stakingVault/table";
import { useLidoVaultsFilter } from "../../hooks/filter/useLidoVaultsFilter";
import { useLidoVaultsData } from "../../hooks/lido/useLidoVaultsData";

export default function LidoStakingVaults() {
  const filter = useLidoVaultsFilter();
  const { data, loading } = useLidoVaultsData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Staking Vaults" }]} />

      <Filter data={filter} />

      <LidoStakingVaultsTable data={data} loading={loading} />
    </Layout>
  );
}
